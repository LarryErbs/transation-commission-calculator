import { DomainEntity } from 'src/common/domain-entity.base';
import { CalculateCommissionEvent } from '../application/event/calculate-commission.event';

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

  public calculateCommission(
    date: string,
    amount: string,
    currency: string,
    clientId: number,
  ): any {
    this.apply(
      new CalculateCommissionEvent(date, Number(amount), currency, clientId),
    );
  }
}
