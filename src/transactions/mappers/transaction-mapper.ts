import { Injectable } from '@nestjs/common';
import { OrmEntityProps, OrmMapper } from 'src/database/mapper.base';
import { TransactionEntity } from '../entities/transaction.entity';
import { Transaction, TransactionProps } from '../transaction';

@Injectable()
export class TransactionMap extends OrmMapper<Transaction, TransactionEntity> {
  protected toDomainProps(ormEntity: TransactionEntity): TransactionProps {
    const props: TransactionProps = {
      id: ormEntity.id,
      amount: ormEntity.amount,
      date: ormEntity.date,
      clientId: ormEntity.clientId,
      currency: ormEntity.currency,
    };
    return props;
  }
  protected toOrmProps(entity: Transaction): OrmEntityProps<TransactionEntity> {
    const props = entity.getPropsCopy();

    const ormProps: OrmEntityProps<TransactionEntity> = {
      amount: props.amount,
      date: props.date,
      clientId: props.clientId,
      currency: props.currency,
    };

    return ormProps;
  }
}
