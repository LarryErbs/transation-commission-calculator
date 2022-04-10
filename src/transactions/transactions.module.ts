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
import { CalculateCommissionDto } from './interface/dto/calculate-commission.dto';
import { CalculateCommissionEvent } from './application/event/calculate-commission.event';
import { CalculateCommissionHandler } from './application/event/calculate-commission.handler';
import { FindClientsMonthlyTransactionsHandler } from './application/query/find-clients.monthly-transactions.handler';
import { FindClientsMonthlyTransactionsQuery } from './application/query/find-clients-monthly-transactions.query';

export const CommandHandlers = [CreateTransactionHandler];
export const QueryHandlers = [
  FindClientsMonthlyTransactionsHandler,
  FindTransactionsByClientIdHandler,
];
export const EventsHandlers = [CalculateCommissionEvent];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([TransactionRepository])],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    CreateTransactionDto,
    CreateTransactionCommand,
    // ...CommandHandlers,
    // ...QueryHandlers,
    // ...EventsHandlers,
    CreateTransactionHandler,
    FindTransactionsByClientIdHandler,
    FindTransactionsByClientIdQuery,
    FindClientsMonthlyTransactionsHandler,
    FindClientsMonthlyTransactionsQuery,
    CalculateCommissionDto,
    CalculateCommissionEvent,
    CalculateCommissionHandler,
    TransactionFactory,
    TransactionMap,
    TransactionRepository,
  ],
})
export class TransactionsModule {}
