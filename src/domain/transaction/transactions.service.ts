import { BadRequestException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateTransactionDto } from '../../interface/transaction/dto/create-transaction.dto';
import { Commission } from './model/commission';
import { ClientDiscoutRule } from './rules/client-discount-rule';
import { DefaultPricingRule } from './rules/default-pricing-rule';
import { HightTurnoverRule } from './rules/high-turnover-rule';
import { RulesStrategy } from './rules/rules-strategy';
import { TransactionFactory } from './transaction.factory';
import { isEqual } from 'lodash';
import { CalculateCommissionDto } from 'src/interface/transaction/dto/calculate-commission.dto';
import { Transaction } from './model/transaction';
import { ExchangeRateService } from 'src/infrastructure/utils/services/exchange-rate.service';
import { QueryBus } from '@nestjs/cqrs';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionFactory: TransactionFactory,
    private readonly exchangeRateService: ExchangeRateService,
    private readonly queryBus: QueryBus,
  ) {}

  create({ date, amount, client_id, currency }: CreateTransactionDto) {
    this.transactionFactory.create(date, amount, currency, client_id);
  }

  async calculateCommission(
    { date, amount, client_id, currency }: CalculateCommissionDto,
    baseCurrency: string,
  ): Promise<any> {
    const transaction = new Transaction({
      date: date,
      amount: parseFloat(amount),
      clientId: client_id,
      currency: currency,
    });

    transaction.amount = await this.convertCurrency(
      transaction.amount,
      transaction.currency,
      baseCurrency,
    );

    const commissions = await this.setRules(transaction);
    const minCommission = this.getMinCommission(commissions);

    return {
      amount: minCommission.toFixed(2),
      currency: baseCurrency,
    };
  }

  private async convertCurrency(
    amount: number,
    currency: string,
    baseCurrency: string,
  ): Promise<number> {
    const response = await firstValueFrom(
      this.exchangeRateService.getCurrencies(),
    );
    const rate = response.data.rates[currency];

    if (!rate) {
      throw new BadRequestException('Unkown currency');
    }

    if (isEqual(rate, baseCurrency)) {
      return amount;
    }

    return this.convert(amount, rate);
  }

  private async setRules(transaction: Transaction): Promise<Commission[]> {
    const defaultPricingRule = await new RulesStrategy(
      new DefaultPricingRule(0, 0.05, 0.5),
    ).calculate(transaction.amount);

    const clientDiscoutRule = await new RulesStrategy(
      new ClientDiscoutRule(0.05, 42),
    ).calculate(transaction.clientId);

    const highTurnoverRule = await new RulesStrategy(
      new HightTurnoverRule(0.03, 1000, this.queryBus),
    ).calculate(transaction.clientId, transaction.date);

    return [defaultPricingRule, clientDiscoutRule, highTurnoverRule];
  }

  private getMinCommission(commissions: Commission[]): number {
    return commissions
      .filter((commission) => commission)
      .map(({ amount: commissionAmount }) => commissionAmount)
      .reduce((prev: number, next: number) => Math.min(prev, next));
  }

  private convert(amount: number, rate: number): number {
    return amount / rate;
  }
}
