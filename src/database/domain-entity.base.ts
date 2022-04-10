import { AggregateRoot } from '@nestjs/cqrs';

export abstract class DomainEntity<EntityProps> extends AggregateRoot {
  constructor(props: EntityProps) {
    super();
    Object.assign(this, props);
  }
}
