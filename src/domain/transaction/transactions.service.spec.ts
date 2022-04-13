import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeRateService } from '../../infrastructure/utils/services/exchange-rate.service';
import { TransactionsService } from './transactions.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CalculateCommissionRequestDto } from './dto/calculate-commission-request.dto';

describe('calculate commission', () => {
  let transactionService: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [TransactionsService, ExchangeRateService, ConfigService],
    }).compile();

    transactionService = module.get<TransactionsService>(TransactionsService);
  });

  it('should set discount #3', async () => {
    const request: CalculateCommissionRequestDto = {
      date: '2021-01-02',
      amount: '2000',
      currency: 'EUR',
      client_id: 1,
    };
    const result = await transactionService.calculateCommission(request, 'EUR');

    expect(result).toStrictEqual({
      amount: '0.03',
      currency: 'EUR',
    });
  });

  it('should set discount #2', async () => {
    const request: CalculateCommissionRequestDto = {
      date: '2021-01-02',
      amount: '100',
      currency: 'USD',
      client_id: 42,
    };
    const result = await transactionService.calculateCommission(request, 'EUR');

    expect(result).toStrictEqual({
      amount: '0.05',
      currency: 'EUR',
    });
  });

  it('should set discount #1', async () => {
    const request: CalculateCommissionRequestDto = {
      date: '2021-01-02',
      amount: '100',
      currency: 'EUR',
      client_id: 1,
    };
    const result = await transactionService.calculateCommission(request, 'EUR');

    expect(result).toStrictEqual({
      amount: '0.50',
      currency: 'EUR',
    });
  });
});
