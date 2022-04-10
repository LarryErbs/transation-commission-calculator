import { Commission } from '../model/commission';
import { Rule } from './rules/rule';

export interface IRulesStrategy {
  calculate(): Promise<Commission>;
}

export class RulesStrategy implements IRulesStrategy {
  private rule: Rule;

  constructor(rule: Rule) {
    this.rule = rule;
  }

  async calculate(...args: any): Promise<Commission> {
    const res = await this.rule.calculate(args);
    console.log(res);
    return res;
  }
}
