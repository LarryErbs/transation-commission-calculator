import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTransactionCommand } from 'src/domain/transaction/command/create-transaction.command';
import { TransactionsService } from 'src/domain/transaction/transactions.service';
import { CalculateCommissionDto } from './dto/calculate-commission.dto';
import { FindTransactionsByClientIdQuery } from 'src/domain/transaction/query/find-transactions-by-client-id.query';
import { Transaction } from 'src/domain/transaction/model/transaction';

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
    return this.transactionsService.calculateCommission(calculateCommissionDto);
  }

  @Get()
  findAll() {
    return this.queryBus.execute<any, any>(
      new FindTransactionsByClientIdQuery(42),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
