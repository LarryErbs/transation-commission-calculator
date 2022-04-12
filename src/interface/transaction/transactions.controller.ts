import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TransactionsService } from 'src/domain/transaction/transactions.service';
import { CalculateCommissionDto } from './dto/calculate-commission.dto';
import { FindTransactionsByClientIdQuery } from 'src/domain/transaction/query/find-transactions-by-client-id.query';
import { Currencies } from 'src/utils/currencies';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly transactionsService: TransactionsService,
  ) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    this.transactionsService.create(createTransactionDto);
  }

  @Post('calculate')
  calculate(@Body() calculateCommissionDto: CalculateCommissionDto) {
    return this.transactionsService.calculateCommission(
      calculateCommissionDto,
      Currencies.EUR,
    );
  }

  @Get()
  findAll() {
    return this.queryBus.execute<any, any>(
      new FindTransactionsByClientIdQuery(42),
    );
  }
}
