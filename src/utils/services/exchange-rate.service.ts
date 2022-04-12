import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';

export interface IExchangeRateService {
  getCurrencies(): Observable<AxiosResponse<any, any>>;
}

@Injectable()
export class ExchangeRateService implements IExchangeRateService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  getCurrencies(): Observable<AxiosResponse<any, any>> {
    return this.httpService.get(
      this.configService.get<string>('EXCHANGE_RATE_API_URL'),
    );
  }
}
