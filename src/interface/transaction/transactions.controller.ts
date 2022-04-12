import { Controller, Post, Body } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TransactionsService } from 'src/domain/transaction/transactions.service';
import { CalculateCommissionDto } from './dto/calculate-commission.dto';
import { Currencies } from 'src/infrastructure/utils/currencies';
import { CreateTransactionCommand } from 'src/domain/transaction/command/create-transaction.command';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly transactionsService: TransactionsService,
  ) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    this.commandBus.execute(new CreateTransactionCommand(createTransactionDto));
  }

  @Post('calculate')
  calculate(@Body() calculateCommissionDto: CalculateCommissionDto) {
    return this.transactionsService.calculateCommission(
      calculateCommissionDto,
      Currencies.EUR,
    );
  }
}
