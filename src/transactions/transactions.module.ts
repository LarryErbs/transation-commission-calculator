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
import { CalculateCommissionEvent } from './domain/event/calculate-commission/calculate-commission.event';
import { FindClientsMonthlyTransactionsHandler } from './application/query/find-clients.monthly-transactions.handler';
import { FindClientsMonthlyTransactionsQuery } from './application/query/find-clients-monthly-transactions.query';
import { CalculateCommissionHandler } from './domain/event/calculate-commission/calculate-commission.handler';
import { ConvertCurrencyEvent } from './domain/event/convert-currency/convert-currency.event';
import { ConvertCurrencyHandler } from './domain/event/convert-currency/convert-currency.handler';
import { HttpModule } from '@nestjs/axios';

export const CommandHandlers = [CreateTransactionHandler];
export const QueryHandlers = [
  FindClientsMonthlyTransactionsHandler,
  FindTransactionsByClientIdHandler,
];
export const EventsHandlers = [CalculateCommissionEvent];

@Module({
  imports: [
    HttpModule,
    CqrsModule,
    TypeOrmModule.forFeature([TransactionRepository]),
  ],
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
    ConvertCurrencyEvent,
    ConvertCurrencyHandler,
    TransactionFactory,
    TransactionMap,
    TransactionRepository,
  ],
})
export class TransactionsModule {}
