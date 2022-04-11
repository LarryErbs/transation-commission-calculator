import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ConvertCurrencyEvent } from './convert-currency.event';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { BadRequestException } from '@nestjs/common';
import { isEqual } from 'lodash';
import { Currencies } from '../../ports/rules/currencies';

@EventsHandler(ConvertCurrencyEvent)
export class ConvertCurrencyHandler
  implements IEventHandler<ConvertCurrencyEvent>
{
  constructor(private readonly httpService: HttpService) {}

  async handle({ amount, currency }: ConvertCurrencyEvent) {
    const response = await this.fetchData();
    const rate = response.data.rates[currency];

    if (!rate) {
      throw new BadRequestException('Unkown currency');
    }

    if (isEqual(rate, Currencies.EUR)) {
      return amount;
    }

    return this.convert(amount, rate);
  }

  private async fetchData(): Promise<any> {
    const url = 'https://api.exchangerate.host/2021-01-01';
    const observable = this.httpService.get(url);
    return firstValueFrom(observable);
  }

  private convert(amount: number, rate: number): number {
    return amount / rate;
  }
}
