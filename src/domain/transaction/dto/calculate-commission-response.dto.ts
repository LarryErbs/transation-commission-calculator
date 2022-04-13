import { ApiProperty } from '@nestjs/swagger';
import { CalculateCommissionResponse } from '../../../interface/transaction/dto/calculate-commission-response';

export class CalculateCommissionResponseDto
  implements CalculateCommissionResponse
{
  @ApiProperty({ example: '500.00' })
  amount: string;

  @ApiProperty({ example: 'EUR' })
  currency: string;
}
