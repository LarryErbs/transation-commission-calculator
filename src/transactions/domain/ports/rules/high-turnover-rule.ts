import { EventPublisher, QueryBus } from '@nestjs/cqrs';
import { FindClientsMonthlyTransactionsQuery } from 'src/transactions/application/query/find-clients-monthly-transactions.query';
import { Commission } from '../../model/commission';
import { Transaction } from '../../transaction';
import { Rule } from './rule';

export class HightTurnoverRule extends Rule {
  constructor(
    private queryBus: QueryBus,
    private publisher: EventPublisher,
    private limitAmount: number,
    private readonly defaultCommission: number,
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
    console.log('monthlyTransactions');
    console.log(monthlyTransactions);

    const totalAmount = this.countTotalAmount(monthlyTransactions);

    if (totalAmount >= this.limitAmount) {
      return {
        amount: this.defaultCommission,
        currency: this.currency,
      };
    }
  }

  private countTotalAmount(monthlyTransactions: Transaction[]): number {
    return monthlyTransactions
      .map(({ amount }) => amount)
      .reduce((prev: number, next: number) => prev + next, 0);
  }
}
