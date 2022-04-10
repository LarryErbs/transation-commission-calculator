import { IQuery } from '@nestjs/cqrs';

export class FindClientsMonthlyTransactionsQuery implements IQuery {
  constructor(readonly clientId: number, readonly date: string) {}
}
