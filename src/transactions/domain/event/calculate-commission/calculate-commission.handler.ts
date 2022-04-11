import {
  EventPublisher,
  EventsHandler,
  IEventHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { Commission } from 'src/transactions/domain/model/commission';
import { RulesStrategy } from 'src/transactions/domain/ports/rules-strategy';
import { ClientDiscoutRule } from 'src/transactions/domain/ports/rules/client-discount-rule';
import { DefaultPricingRule } from 'src/transactions/domain/ports/rules/default-pricing-rule';
import { HightTurnoverRule } from 'src/transactions/domain/ports/rules/high-turnover-rule';
import { Currencies } from '../../ports/rules/currencies';
import { Transaction } from '../../transaction';
import { CalculateCommissionEvent } from './calculate-commission.event';

@EventsHandler(CalculateCommissionEvent)
export class CalculateCommissionHandler
  implements IEventHandler<CalculateCommissionEvent>
{
  constructor(private publisher: EventPublisher, private queryBus: QueryBus) {}

  async handle({ amount, clientId, currency, date }: CalculateCommissionEvent) {
    const transaction = this.publisher.mergeObjectContext(
      new Transaction({
        amount: amount,
        clientId: clientId,
        currency: currency,
        date: date,
      }),
    );
    const convertedAmount = transaction.convertCurrency(Currencies.EUR);
    transaction.commit();
    console.log('convertedAmount');
    console.log(convertedAmount);

    const defaultPricingRule = await new RulesStrategy(
      new DefaultPricingRule(0.05, 0.5),
    ).calculate(amount);

    const clientDiscoutRule = await new RulesStrategy(
      new ClientDiscoutRule(0.05, 42),
    ).calculate(clientId);

    const highTurnoverRule = await new RulesStrategy(
      new HightTurnoverRule(this.queryBus, this.publisher, 1000, 0.03),
    ).calculate(clientId, date);

    const commissions = [
      defaultPricingRule,
      clientDiscoutRule,
      highTurnoverRule,
    ];

    const minCommission = this.getMinCommission(commissions);

    console.log(minCommission);
    // this.publisher.mergeObjectContext();
  }

  private getMinCommission(commissions: Commission[]): number {
    return commissions
      .filter((commission) => commission)
      .map(({ amount: commissionAmount }) => commissionAmount)
      .reduce((prev: number, next: number) => Math.min(prev, next));
  }
}
