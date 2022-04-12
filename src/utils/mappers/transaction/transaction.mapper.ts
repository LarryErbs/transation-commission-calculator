import { Injectable } from '@nestjs/common';
import {
  Transaction,
  TransactionProps,
} from 'src/domain/transaction/model/transaction';
import { TransactionEntity } from 'src/persistance/transaction/transaction.entity';
import { OrmMapper } from 'src/utils/mappers/mapper.base';

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
  protected toOrmProps(entity: Transaction): TransactionEntity {
    const props = entity.getPropsCopy();
    const ormProps: TransactionEntity = {
      amount: props.amount,
      date: props.date,
      clientId: props.clientId,
      currency: props.currency,
    };
    return ormProps;
  }
}
