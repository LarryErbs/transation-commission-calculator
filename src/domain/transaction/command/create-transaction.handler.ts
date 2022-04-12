import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TransactionFactory } from '../transaction.factory';
import { CreateTransactionCommand } from './create-transaction.command';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandler
  implements ICommandHandler<CreateTransactionCommand>
{
  constructor(private readonly transactionFactory: TransactionFactory) {}

  async execute({
    createTransactionDto: { date, amount, currency, client_id },
  }: CreateTransactionCommand): Promise<void> {
    await this.transactionFactory.create(date, amount, currency, client_id);
  }
}
