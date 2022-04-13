import { Commission } from '../model/commission';
import { Rule } from './rule';

export class DefaultPricingRule extends Rule {
  constructor(
    private readonly defaultCommission: number,
    private readonly limitAmount: number,
    private procent: number,
  ) {
    super();
    this.procent /= 100;
  }

  calculate(amount: number): Commission {
    let commission = amount * this.procent;
    if (commission < this.limitAmount) {
      commission = this.defaultCommission;
    }

    return new Commission({
      amount: commission,
      currency: this.currency,
    });
  }
}
