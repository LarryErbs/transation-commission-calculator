import { IQuery } from '@nestjs/cqrs';

export class FindTransactionsByClientIdQuery implements IQuery {
  constructor(readonly id: number) {}
}
