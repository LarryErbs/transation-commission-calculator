import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CalculateCommissionRequestDto } from '../../domain/transaction/dto/calculate-commission-request.dto';
import { CalculateCommissionResponseDto } from '../../domain/transaction/dto/calculate-commission-response.dto';
import { TransactionsService } from '../../domain/transaction/transactions.service';
import { Currencies } from '../../infrastructure/utils/currencies';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiTags('calculate commission')
  @ApiResponse({
    status: 200,
    description: 'Transaction commission.',
    type: () => CalculateCommissionResponseDto,
  })
  @Post('calculate')
  @HttpCode(200)
  calculate(
    @Body() calculateCommissionDto: CalculateCommissionRequestDto,
  ): Promise<CalculateCommissionResponseDto> {
    return this.transactionsService.calculateCommission(
      calculateCommissionDto,
      Currencies.EUR,
    );
  }
}
