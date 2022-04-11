export class ConvertCurrencyEvent {
  constructor(
    public readonly amount: number,
    public readonly currency: string,
    public readonly baseCurrency: string,
  ) {}
}
