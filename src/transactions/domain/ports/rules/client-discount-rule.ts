import { Commission } from '../../model/commission';
import { Rule } from './rule';
import { isEqual } from 'lodash';

export class ClientDiscoutRule extends Rule {
  constructor(
    private readonly defaultCommission: number,
    private readonly defaultClientId: number,
  ) {
    super();
  }

  calculate([clientId]): Commission | undefined {
    if (isEqual(clientId, this.defaultClientId)) {
      return {
        amount: this.defaultCommission,
        currency: this.currency,
      };
    }
  }
}
