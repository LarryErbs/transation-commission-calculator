import { Injectable } from '@nestjs/common';
import { TransactionRepository } from 'src/persistance/transaction/transaction.repository';
import { EntityFactory } from 'src/utils/entity.factory';
import { Transaction } from './model/transaction';

@Injectable()
export class TransactionFactory implements EntityFactory<Transaction> {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async create(
    date: string,
    amount: string,
    currency: string,
    clientId: number,
  ): Promise<Transaction> {
    const transaction = new Transaction({
      date: date,
      amount: parseFloat(amount),
      currency: currency,
      clientId: clientId,
    });
    await this.transactionRepository.saveOne(transaction);
    return transaction;
  }
}
