import { CalculateCommissionResponse } from '../../../interface/transaction/dto/calculate-commission-response';

export class CalculateCommissionResponseDto
  implements CalculateCommissionResponse
{
  amount: string;
  currency: string;
}
