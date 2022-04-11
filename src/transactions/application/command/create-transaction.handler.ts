import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { TransactionFactory } from '../../domain/transaction.factory';
import { CreateTransactionCommand } from './create-transaction.command';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandler
  implements ICommandHandler<CreateTransactionCommand>
{
  constructor(
    private readonly transactionFactory: TransactionFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    createTransactionDto: { date, amount, currency, client_id },
  }: CreateTransactionCommand): Promise<void> {
    const transaction = this.eventPublisher.mergeObjectContext(
      await this.transactionFactory.create(date, amount, currency, client_id),
    );
    transaction.calculateCommission();
    transaction.commit();
  }
}
