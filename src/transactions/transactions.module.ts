import { Module } from '@nestjs/common';
import { TransactionsService } from './domain/transactions.service';
import { TransactionsController } from './interface/transactions.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateTransactionDto } from './interface/dto/create-transaction.dto';
import { CreateTransactionCommand } from './application/command/create-transaction.command';
import { CreateTransactionHandler } from './application/command/create-transaction.handler';
import { TransactionFactory } from './domain/transaction.factory';
import { TransactionRepository } from './infrastructure/repository/transaction.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindTransactionsByClientIdQuery } from './application/query/find-transactions-by-client-id.query';
import { FindTransactionsByClientIdHandler } from './application/query/find-transactions-by-client-id.handler';
import { TransactionMap } from './domain/transaction.mapper';

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
