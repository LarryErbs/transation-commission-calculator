import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { TransactionsService } from '../../domain/transaction/transactions.service';
import { Currencies } from '../../infrastructure/utils/currencies';
import { CalculateCommissionRequest } from './dto/calculate-commission-request';
import { CalculateCommissionResponse } from './dto/calculate-commission-response';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('calculate')
  @HttpCode(200)
  calculate(
    @Body() calculateCommissionDto: CalculateCommissionRequest,
  ): Promise<CalculateCommissionResponse> {
    return this.transactionsService.calculateCommission(
      calculateCommissionDto,
      Currencies.EUR,
    );
  }
}
