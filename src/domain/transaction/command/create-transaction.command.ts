import { CreateTransactionDto } from '../../../interface/transaction/dto/create-transaction.dto';

export class CreateTransactionCommand {
  constructor(public readonly createTransactionDto: CreateTransactionDto) {}
}
