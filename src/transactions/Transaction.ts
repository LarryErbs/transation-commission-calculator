import { DomainEntity } from 'src/database/domain-entity.base';
import { TransactionEntity } from './entities/transaction.entity';

export interface TransactionProps {
  id?: number;
  date: string;
  amount: string;
  currency: string;
  clientId: number;
}

export class Transaction extends DomainEntity<TransactionEntity> {
  public readonly id: number;
  public readonly date: string;
  public readonly amount: string;
  public readonly currency: string;
  public readonly clientId: number;

  constructor(props: TransactionProps) {
    super(props);
  }

  public getPropsCopy(): TransactionProps {
    const propsCopy = {
      ...this,
    };
    return Object.freeze(propsCopy);
  }
}
