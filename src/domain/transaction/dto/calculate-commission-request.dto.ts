import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { CalculateCommissionRequest } from '../../../interface/transaction/dto/calculate-commission-request';
import { CalculateCommissionResponseDto } from './calculate-commission-response.dto';

@ApiExtraModels(CalculateCommissionResponseDto)
export class CalculateCommissionRequestDto
  extends CalculateCommissionResponseDto
  implements CalculateCommissionRequest
{
  @ApiProperty({ example: '2022-02-02' })
  date: string;

  @ApiProperty({ example: '12' })
  client_id: string;
}
