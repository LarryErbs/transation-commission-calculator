export abstract class OrmMapper<Entity, OrmEntity> {
  constructor(
    private domainEntityConstructor: new (props: any) => Entity,
    private ormEntityConstructor: new (props: any) => OrmEntity,
  ) {}

  protected abstract toDomainProps(ormEntity: OrmEntity): any;

  protected abstract toOrmProps(entity: Entity): OrmEntity;

  toDomainEntity = (ormEntity: OrmEntity): Entity => {
    const props = this.toDomainProps(ormEntity);
    return new this.domainEntityConstructor(props);
  };

  toOrmEntity(entity: Entity): OrmEntity {
    const props = this.toOrmProps(entity);
    return new this.ormEntityConstructor(props);
  }
}
