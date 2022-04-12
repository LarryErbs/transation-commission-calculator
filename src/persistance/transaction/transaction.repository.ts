import {
  EntityRepository,
  getRepository,
  LessThan,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import * as moment from 'moment';
import { TransactionMap } from 'src/utils/mappers/transaction/transaction.mapper';
import { Transaction } from 'src/domain/transaction/model/transaction';
export interface ITransactionRepository {
  findByClientId(id: number): Promise<Transaction[]>;
  findClientsMonthlyTransactions(
    clientId: number,
    date: string,
  ): Promise<Transaction[]>;
}

@EntityRepository(TransactionEntity)
export class TransactionRepository
  extends Repository<TransactionEntity>
  implements ITransactionRepository
{
  private readonly mapper: TransactionMap;

  constructor() {
    super();
    this.mapper = new TransactionMap(Transaction, TransactionEntity);
  }

  async saveOne(data: Transaction): Promise<void> {
    getRepository(TransactionEntity).save(this.mapper.toOrmEntity(data));
  }

  async findByClientId(id: number): Promise<Transaction[]> {
    return (
      await getRepository(TransactionEntity).find({
        where: {
          clientId: id,
        },
      })
    ).map(this.mapper.toDomainEntity);
  }

  async findClientsMonthlyTransactions(
    clientId: number,
    date: string,
  ): Promise<Transaction[]> {
    const after = moment(date).startOf('month').format('YYYY-MM-DD');
    const before = moment(date).endOf('month').format('YYYY-MM-DD');
    return (
      await getRepository(TransactionEntity).find({
        where: {
          clientId: clientId,
          date: MoreThanOrEqual(after) && LessThan(before),
        },
      })
    ).map(this.mapper.toDomainEntity);
  }
}
