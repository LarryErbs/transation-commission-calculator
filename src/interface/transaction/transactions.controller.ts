import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { TransactionsService } from 'src/domain/transaction/transactions.service';
import { Currencies } from 'src/infrastructure/utils/currencies';
import { CalculateCommissionDto } from './dto/calculate-commission.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('calculate')
  @HttpCode(200)
  calculate(@Body() calculateCommissionDto: CalculateCommissionDto) {
    return this.transactionsService.calculateCommission(
      calculateCommissionDto,
      Currencies.EUR,
    );
  }
}
