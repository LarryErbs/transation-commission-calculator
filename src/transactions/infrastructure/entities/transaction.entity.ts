import { TypeormEntityBase } from 'src/common/orm-entity.base';
import { ColumnNumericTransformer } from 'src/database/transformer';
import { Column, Entity } from 'typeorm';

@Entity()
export class TransactionEntity extends TypeormEntityBase {
  constructor(props?: TransactionEntity) {
    super(props);
  }

  @Column({ type: 'date' })
  public date: string;

  @Column('decimal', {
    transformer: new ColumnNumericTransformer(),
  })
  public amount: number;

  @Column()
  public currency: string;

  @Column({ name: 'clientid' })
  public clientId: number;
}
