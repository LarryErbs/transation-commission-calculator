import { Commission } from '../model/commission';
import { Currencies } from '../../../utils/currencies';

export abstract class Rule {
  protected currency = Currencies.EUR;

  abstract calculate(...args: any): Commission | Promise<Commission>;
}
