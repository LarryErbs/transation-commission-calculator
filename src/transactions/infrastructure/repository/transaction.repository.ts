import { EntityRepository, getRepository, Repository } from 'typeorm';
import { TransactionEntity } from '../entities/transaction.entity';
import { TransactionMap } from '../../domain/transaction.mapper';
import { Transaction } from '../../domain/transaction';

@EntityRepository(TransactionEntity)
export class TransactionRepository extends Repository<TransactionEntity> {
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
}
