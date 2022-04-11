import { DomainEntity } from 'src/common/domain-entity.base';
import { CalculateCommissionEvent } from './event/calculate-commission/calculate-commission.event';
import { ConvertCurrencyEvent } from './event/convert-currency/convert-currency.event';

export interface TransactionProps {
  id?: number;
  date: string;
  amount: number;
  currency: string;
  clientId: number;
}

export class Transaction extends DomainEntity<TransactionProps> {
  public readonly id: number;
  public readonly date: string;
  public readonly amount: number;
  public readonly currency: string;
  public readonly clientId: number;

  constructor(props: TransactionProps) {
    super(props);
  }

  public getPropsCopy(): TransactionProps {
    return Object.freeze({ ...this });
  }

  public calculateCommission(): void {
    this.apply(
      new CalculateCommissionEvent(
        this.date,
        Number(this.amount),
        this.currency,
        this.clientId,
      ),
    );
  }

  public convertCurrency(baseCurrency: string): any {
    this.apply(
      new ConvertCurrencyEvent(this.amount, this.currency, baseCurrency),
    );
  }
}
