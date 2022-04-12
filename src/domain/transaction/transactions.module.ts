import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { TransactionFactory } from './transaction.factory';
import { TransactionsService } from './transactions.service';
import { CreateTransactionCommand } from './command/create-transaction.command';
import { CreateTransactionHandler } from './command/create-transaction.handler';
import { FindClientsMonthlyTransactionsQuery } from './query/find-clients-monthly-transactions.query';
import { FindClientsMonthlyTransactionsHandler } from './query/find-clients-monthly-transactions.handler';

import { TransactionRepository } from '../../infrastructure/transaction/transaction.repository';
import { TransactionMap } from '../../infrastructure/transaction/transaction.mapper';
import { ExchangeRateService } from 'src/infrastructure/utils/services/exchange-rate.service';

import { CreateTransactionDto } from '../../interface/transaction/dto/create-transaction.dto';
import { CalculateCommissionDto } from '../../interface/transaction/dto/calculate-commission.dto';
import { TransactionsController } from 'src/interface/transaction/transactions.controller';

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
    ...CommandHandlers,
    ...QueryHandlers,
    FindClientsMonthlyTransactionsQuery,
    CalculateCommissionDto,
    TransactionFactory,
    TransactionMap,
    TransactionRepository,
  ],
})
export class TransactionsModule {}
