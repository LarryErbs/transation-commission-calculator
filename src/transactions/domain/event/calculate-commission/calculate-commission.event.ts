export class CalculateCommissionEvent {
  constructor(
    public readonly date: string,
    public readonly amount: number,
    public readonly currency: string,
    public readonly clientId: number,
  ) {}
}
