import { AggregateRoot } from '@nestjs/cqrs';

export interface TransactionProps {
  id?: number;
  date: string;
  amount: number;
  currency: string;
  clientId: number;
}

export class Transaction extends AggregateRoot {
  private _id: number;
  private _amount: number;
  private _date: string;
  private _currency: string;
  private _clientId: number;

  constructor(props: TransactionProps) {
    super();
    Object.assign(this, props);
  }

  public getPropsCopy(): TransactionProps {
    return Object.freeze({
      amount: this.amount,
      date: this.date,
      clientId: this.clientId,
      currency: this.currency,
    } as TransactionProps);
  }

  public get id(): number {
    return this._id;
  }

  public set id(value: number) {
    this._id = value;
  }

  public get date(): string {
    return this._date;
  }
  public set date(value: string) {
    this._date = value;
  }
  public get amount(): number {
    return this._amount;
  }
  public set amount(value: number) {
    this._amount = value;
  }
  public get currency(): string {
    return this._currency;
  }
  public set currency(value: string) {
    this._currency = value;
  }
  public get clientId(): number {
    return this._clientId;
  }
  public set clientId(value: number) {
    this._clientId = value;
  }
}
