import { BadRequestException } from '@nestjs/common';
import { isEqual } from 'lodash';
import { Currencies } from '../rules/currencies';
import { RulesStrategy } from '../rules/rules-strategy';
import { date } from '@hapi/joi';
import { firstValueFrom } from 'rxjs';
import { ClientDiscoutRule } from '../rules/client-discount-rule';
import { DefaultPricingRule } from '../rules/default-pricing-rule';
import { HightTurnoverRule } from '../rules/high-turnover-rule';
import { Commission } from './commission';

export interface TransactionProps extends CommissionProps {
  id?: number;
  date: string;
  clientId: number;
  commission?: CommissionProps;
}

export interface CommissionProps {
  amount: number;
  currency: string;
}

export class Transaction {
  public readonly id: number;
  public readonly date: string;
  public readonly amount: number;
  public readonly currency: string;
  public readonly clientId: number;
  // public readonly commission?: CommissionProps;

  constructor(props: TransactionProps) {
    Object.assign(this, props);
    // super(props);
  }

  public getPropsCopy(): TransactionProps {
    return Object.freeze({ ...this });
  }
}
