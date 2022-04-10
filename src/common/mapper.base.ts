import { AggregateRoot } from '@nestjs/cqrs';

export type OrmEntityProps<OrmEntity> = Omit<OrmEntity, 'id'>;

export abstract class OrmMapper<
  Entity extends AggregateRoot<unknown>,
  OrmEntity,
> {
  constructor(
    private entityConstructor: new (props: any) => Entity,
    private ormEntityConstructor: new (props: any) => OrmEntity,
  ) {}

  protected abstract toDomainProps(ormEntity: OrmEntity): any;

  protected abstract toOrmProps(entity: Entity): OrmEntityProps<OrmEntity>;

  toDomainEntity = (ormEntity: OrmEntity): Entity => {
    const props = this.toDomainProps(ormEntity);
    return new this.entityConstructor(props);
  };

  toOrmEntity(entity: Entity): OrmEntity {
    const props = this.toOrmProps(entity);
    return new this.ormEntityConstructor(props);
  }
}
