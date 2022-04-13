import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { TransactionsService } from './transactions.service';

import { ExchangeRateService } from '../../infrastructure/utils/services/exchange-rate.service';

import { TransactionsController } from '../../interface/transaction/transactions.controller';
import { CalculateCommissionDto } from '../../interface/transaction/dto/calculate-commission.dto';

@Module({
  imports: [HttpModule, CqrsModule, ConfigModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, ExchangeRateService, CalculateCommissionDto],
})
export class TransactionsModule {}
