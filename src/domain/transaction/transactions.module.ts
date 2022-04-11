import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateTransactionDto } from '../../interface/transaction/dto/create-transaction.dto';
import { CreateTransactionCommand } from './command/create-transaction.command';
import { CreateTransactionHandler } from './command/create-transaction.handler';
import { TransactionRepository } from '../../persistance/transaction/transaction.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalculateCommissionDto } from '../../interface/transaction/dto/calculate-commission.dto';
import { CalculateCommissionEvent } from './event/calculate-commission/calculate-commission.event';
import { CalculateCommissionHandler } from './event/calculate-commission/calculate-commission.handler';
import { ConvertCurrencyEvent } from './event/convert-currency/convert-currency.event';
import { ConvertCurrencyHandler } from './event/convert-currency/convert-currency.handler';
import { HttpModule } from '@nestjs/axios';
import { TransactionFactory } from './transaction.factory';
import { TransactionMap } from '../../utils/mappers/transaction/transaction.mapper';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from 'src/interface/transaction/transactions.controller';
import { FindClientsMonthlyTransactionsQuery } from './query/find-clients-monthly-transactions.query';
import { FindClientsMonthlyTransactionsHandler } from './query/find-clients.monthly-transactions.handler';
import { FindTransactionsByClientIdHandler } from './query/find-transactions-by-client-id.handler';
import { FindTransactionsByClientIdQuery } from './query/find-transactions-by-client-id.query';

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
