import { Commission } from '../model/commission';
import { Rule } from './rule';

export interface IRulesStrategy {
  calculate(): Promise<Commission>;
}

export class RulesStrategy implements IRulesStrategy {
  constructor(private rule: Rule) {}

  async calculate(...args: any): Promise<Commission> {
    return this.rule.calculate(...args);
  }
}
