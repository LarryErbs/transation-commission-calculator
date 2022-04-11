import { Commission } from '../model/commission';
import { Rule } from './rules/rule';

export interface IRulesStrategy {
  calculate(): Promise<Commission>;
}

export class RulesStrategy implements IRulesStrategy {
  constructor(private rule: Rule) {}

  async calculate(...args: any): Promise<Commission> {
    const res = await this.rule.calculate(...args);
    console.log(res);
    return res;
  }
}
