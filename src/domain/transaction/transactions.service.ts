import { date } from '@hapi/joi';
import { BadRequestException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateTransactionDto } from '../../interface/transaction/dto/create-transaction.dto';
import { UpdateTransactionDto } from '../../interface/transaction/dto/update-transaction.dto';
import { Commission } from './model/commission';
import { ClientDiscoutRule } from './rules/client-discount-rule';
import { Currencies } from './rules/currencies';
import { DefaultPricingRule } from './rules/default-pricing-rule';
import { HightTurnoverRule } from './rules/high-turnover-rule';
import { RulesStrategy } from './rules/rules-strategy';
import { TransactionFactory } from './transaction.factory';
import { isEqual } from 'lodash';
import { CalculateCommissionDto } from 'src/interface/transaction/dto/calculate-commission.dto';
import { Transaction } from './model/transaction';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionFactory: TransactionFactory,
    private readonly httpService: HttpService,
  ) {}

  create({ date, amount, client_id, currency }: CreateTransactionDto) {
    this.transactionFactory.create(date, amount, currency, client_id);
  }

  async calculateCommission({
    date,
    amount,
    client_id,
    currency,
  }: CalculateCommissionDto): Promise<void> {
    const transaction = new Transaction({
      date: date,
      amount: parseFloat(amount),
      clientId: client_id,
      currency: currency,
    });
    const convertedAmount = await this.convertCurrency(
      transaction.amount,
      transaction.currency,
      Currencies.EUR,
    );
    // transaction.commit();
    console.log('convertedAmount');
    console.log(convertedAmount);

    const defaultPricingRule = await new RulesStrategy(
      new DefaultPricingRule(0.05, 0.5),
    ).calculate(transaction.amount);

    const clientDiscoutRule = await new RulesStrategy(
      new ClientDiscoutRule(0.05, 42),
    ).calculate(transaction.clientId);

    const highTurnoverRule = await new RulesStrategy(
      new HightTurnoverRule(1000, 0.03),
    ).calculate(transaction.clientId, transaction.date);

    const commissions = [
      defaultPricingRule,
      clientDiscoutRule,
      highTurnoverRule,
    ];

    const minCommission = this.getMinCommission(commissions);

    console.log(minCommission);
    // this.publisher.mergeObjectContext();
  }

  private getMinCommission(commissions: Commission[]): number {
    return commissions
      .filter((commission) => commission)
      .map(({ amount: commissionAmount }) => commissionAmount)
      .reduce((prev: number, next: number) => Math.min(prev, next));
  }

  public async convertCurrency(
    amount: number,
    currency: string,
    _baseCurrency: string,
  ): Promise<any> {
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

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
