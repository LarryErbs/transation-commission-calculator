import { TypeormEntityBase } from 'src/common/orm-entity.base';
import { Column, Entity } from 'typeorm';

@Entity()
export class TransactionEntity extends TypeormEntityBase {
  constructor(props?: TransactionEntity) {
    super(props);
  }

  @Column()
  public date: string;

  @Column()
  public amount: string;

  @Column()
  public currency: string;

  @Column()
  public clientId: number;
}
