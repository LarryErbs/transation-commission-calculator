import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { TransactionsService } from './transactions.service';

import { ExchangeRateService } from 'src/infrastructure/utils/services/exchange-rate.service';

import { TransactionsController } from 'src/interface/transaction/transactions.controller';
import { CalculateCommissionDto } from 'src/interface/transaction/dto/calculate-commission.dto';

@Module({
  imports: [HttpModule, CqrsModule, ConfigModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, ExchangeRateService, CalculateCommissionDto],
})
export class TransactionsModule {}
