import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TransactionRepository } from '../../infrastructure/repository/transaction.repository';
import { FindTransactionsByClientIdQuery } from './find-transactions-by-client-id.query';

@QueryHandler(FindTransactionsByClientIdQuery)
export class FindTransactionsByClientIdHandler
  implements IQueryHandler<FindTransactionsByClientIdQuery>
{
  constructor(private readonly transactionRepository: TransactionRepository) {}

  execute({ id }: FindTransactionsByClientIdQuery): Promise<any> {
    return this.transactionRepository.findByClientId(id);
  }
}
