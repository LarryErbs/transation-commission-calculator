import { Commission } from '../../model/commission';
import { Rule } from './rule';

export class DefaultPricingRule extends Rule {
  constructor(
    private readonly defaultCommission: number,
    private procent: number,
  ) {
    super();
    this.procent /= 100;
  }

  calculate([amount]): Commission {
    let commission = amount * this.procent;
    if (commission < this.defaultCommission) {
      commission = this.defaultCommission;
    }

    return {
      amount: commission,
      currency: this.currency,
    };
  }
}
