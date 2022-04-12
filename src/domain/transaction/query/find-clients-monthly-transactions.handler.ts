import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TransactionRepository } from 'src/infrastructure/transaction/transaction.repository';
import { FindClientsMonthlyTransactionsQuery } from './find-clients-monthly-transactions.query';

@QueryHandler(FindClientsMonthlyTransactionsQuery)
export class FindClientsMonthlyTransactionsHandler
  implements IQueryHandler<FindClientsMonthlyTransactionsQuery>
{
  constructor(private readonly transactionRepository: TransactionRepository) {}

  execute({
    clientId,
    date,
  }: FindClientsMonthlyTransactionsQuery): Promise<any> {
    return this.transactionRepository.findClientsMonthlyTransactions(
      clientId,
      date,
    );
  }
}
