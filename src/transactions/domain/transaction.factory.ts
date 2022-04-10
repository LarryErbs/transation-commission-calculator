import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/common/entity.factory';
import { Transaction } from './transaction';
import { TransactionRepository } from '../infrastructure/repository/transaction.repository';

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
