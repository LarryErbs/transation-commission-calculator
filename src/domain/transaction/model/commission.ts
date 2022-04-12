export interface CommissionProps {
  amount: number;
  currency: string;
}

export class Commission {
  public readonly amount: number;
  public readonly currency: string;

  constructor(props: CommissionProps) {
    Object.assign(this, props);
  }

  public getPropsCopy(): CommissionProps {
    return Object.freeze({ ...this });
  }
}
