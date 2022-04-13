import { CalculateCommissionResponse } from './calculate-commission-response';

export interface CalculateCommissionRequest
  extends CalculateCommissionResponse {
  date: string;
  client_id: string;
}
