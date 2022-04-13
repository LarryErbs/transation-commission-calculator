import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from '../../domain/transaction/transactions.service';
import { INestApplication } from '@nestjs/common';
import { TransactionsModule } from '../../domain/transaction/transactions.module';

describe('transactions controller', () => {
  let transactionsController: TransactionsController;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        {
          provide: TransactionsService,
          useValue: {
            calculateCommission: jest.fn().mockReturnValue({
              amount: '0.05',
              currency: 'EUR',
            }),
          },
        },
      ],
      controllers: [TransactionsController],
    }).compile();

    transactionsController = module.get<TransactionsController>(
      TransactionsController,
    );
  });

  it('calculate', async () => {
    const result = await transactionsController.calculate({
      date: '2021-01-01',
      amount: '100.00',
      currency: 'EUR',
      client_id: '42',
    });

    expect(typeof result).toBe('object');
    expect(result.amount).toBe('0.05');
    expect(result.currency).toBe('EUR');
  });
});

describe('transactions', () => {
  let app: INestApplication;
  const transactionsService = {
    calculateCommission: () => {
      return {
        amount: '0.05',
        currency: 'EUR',
      };
    },
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TransactionsModule],
    })
      .overrideProvider(TransactionsService)
      .useValue(transactionsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/POST calculate`, () => {
    return request(app.getHttpServer())
      .post('/transactions/calculate')
      .expect(200)
      .expect(transactionsService.calculateCommission());
  });

  afterAll(async () => {
    await app.close();
  });
});
