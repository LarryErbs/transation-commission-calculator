import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TransactionsService } from '../domain/transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTransactionCommand } from '../application/command/create-transaction.command';
import { FindTransactionsByClientIdQuery } from '../application/query/find-transactions-by-client-id.query';
import { CalculateCommissionDto } from './dto/calculate-commission.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly transactionsService: TransactionsService,
  ) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.commandBus.execute<CreateTransactionCommand, any>(
      new CreateTransactionCommand(createTransactionDto),
    );
  }

  @Post('calculate')
  calculate(@Body() calculateCommissionDto: CalculateCommissionDto) {
    // return this.eventBus.publish<CalculateCommissionDto, any>(
    //   new CreateTransactionCommand(calculateCommissionDto),
    // );
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
