import { CalculateCommissionRequest } from '../../../interface/transaction/dto/calculate-commission-request';
import { CalculateCommissionResponseDto } from './calculate-commission-response.dto';

export class CalculateCommissionRequestDto
  extends CalculateCommissionResponseDto
  implements CalculateCommissionRequest
{
  date: string;
  client_id: number;
}
