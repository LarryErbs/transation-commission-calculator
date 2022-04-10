import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { CreateTransactionCommand } from './commands/create-transaction.command';
import { CreateTransactionHandler } from './commands/create-transaction.handler';
import { TransactionFactory } from './transaction.factory';
import { TransactionRepository } from './transaction.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindTransactionsByClientIdQuery } from './queries/find-transactions-by-client-id.query';
import { FindTransactionsByClientIdHandler } from './queries/find-transactions-by-client-id.handler';
import { TransactionMap } from './mappers/transaction-mapper';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([TransactionRepository])],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    CreateTransactionDto,
    CreateTransactionCommand,
    CreateTransactionHandler,
    FindTransactionsByClientIdHandler,
    FindTransactionsByClientIdQuery,
    TransactionFactory,
    TransactionMap,
    TransactionRepository,
  ],
})
export class TransactionsModule {}
