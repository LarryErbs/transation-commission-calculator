import { QueryBus } from '@nestjs/cqrs';
import { Commission } from '../model/commission';
import { Rule } from './rule';
import { FindClientsMonthlyTransactionsQuery } from 'src/domain/transaction/query/find-clients-monthly-transactions.query';
import { Transaction } from 'src/domain/transaction/model/transaction';

export class HightTurnoverRule extends Rule {
  constructor(
    private limitAmount: number,
    private defaultCommission: number,
    private queryBus: QueryBus,
  ) {
    super();
  }

  async calculate(
    clientId: number,
    date: string,
  ): Promise<Commission | undefined> {
    const monthlyTransactions = await this.queryBus.execute<any, any>(
      new FindClientsMonthlyTransactionsQuery(clientId, date),
    );
    const totalAmount = this.countTotalAmount(monthlyTransactions);
    if (totalAmount >= this.limitAmount) {
      return new Commission({
        amount: this.defaultCommission,
        currency: this.currency,
      });
    }
  }

  private countTotalAmount(monthlyTransactions: Transaction[]): number {
    return monthlyTransactions
      .map(({ amount }) => amount)
      .reduce((prev: number, next: number) => prev + next, 0);
  }
}
