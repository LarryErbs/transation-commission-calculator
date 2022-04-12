import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateTransactionDto } from '../../interface/transaction/dto/create-transaction.dto';
import { CreateTransactionCommand } from './command/create-transaction.command';
import { CreateTransactionHandler } from './command/create-transaction.handler';
import { TransactionRepository } from '../../infrastructure/transaction/transaction.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalculateCommissionDto } from '../../interface/transaction/dto/calculate-commission.dto';
import { HttpModule } from '@nestjs/axios';
import { TransactionFactory } from './transaction.factory';
import { TransactionMap } from '../../infrastructure/transaction/transaction.mapper';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from 'src/interface/transaction/transactions.controller';
import { FindClientsMonthlyTransactionsQuery } from './query/find-clients-monthly-transactions.query';
import { FindClientsMonthlyTransactionsHandler } from './query/find-clients-monthly-transactions.handler';
import { ConfigModule } from '@nestjs/config';
import { ExchangeRateService } from 'src/infrastructure/utils/services/exchange-rate.service';

export const CommandHandlers = [CreateTransactionHandler];
export const QueryHandlers = [FindClientsMonthlyTransactionsHandler];

@Module({
  imports: [
    HttpModule,
    CqrsModule,
    ConfigModule,
    TypeOrmModule.forFeature([TransactionRepository]),
  ],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    ExchangeRateService,
    CreateTransactionDto,
    CreateTransactionCommand,
    // ...CommandHandlers,
    // ...QueryHandlers,
    // ...EventsHandlers,
    CreateTransactionHandler,
    FindClientsMonthlyTransactionsHandler,
    FindClientsMonthlyTransactionsQuery,
    CalculateCommissionDto,
    TransactionFactory,
    TransactionMap,
    TransactionRepository,
  ],
})
export class TransactionsModule {}
