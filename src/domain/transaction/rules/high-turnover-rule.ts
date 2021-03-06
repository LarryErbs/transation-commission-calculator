import { Commission } from '../model/commission';
import { Rule } from './rule';

export class HightTurnoverRule extends Rule {
  constructor(private defaultCommission: number, private limitAmount: number) {
    super();
  }

  async calculate(amount: number): Promise<Commission | undefined> {
    if (amount < this.limitAmount) {
      return undefined;
    }

    return new Commission({
      amount: this.defaultCommission,
      currency: this.currency,
    });
  }
}
