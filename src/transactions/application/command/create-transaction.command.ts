import { CreateTransactionDto } from '../../interface/dto/create-transaction.dto';

export class CreateTransactionCommand {
  constructor(public readonly createTransactionDto: CreateTransactionDto) {}
}
