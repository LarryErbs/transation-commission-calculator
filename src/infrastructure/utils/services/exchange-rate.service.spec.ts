import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { firstValueFrom, Observable } from 'rxjs';
import { ExchangeRateService } from './exchange-rate.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

describe('exchangerate service', () => {
  let exchangeRateService: ExchangeRateService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        ExchangeRateService,
        ConfigService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn().mockReturnValue(
              new Observable<AxiosResponse>((subscriber) => {
                subscriber.next({
                  data: {
                    base: 'EUR',
                    date: '2021-01-01',
                    rates: {
                      EUR: 1,
                      USD: 1.217582,
                    },
                  },
                  headers: {},
                  config: {},
                  status: 200,
                  statusText: 'OK',
                });
              }),
            ),
          },
        },
      ],
    }).compile();

    exchangeRateService = module.get<ExchangeRateService>(ExchangeRateService);
  });

  it('should be defined', () => {
    expect(exchangeRateService).toBeDefined();
  });

  it('should return response', async () => {
    const result = exchangeRateService.getCurrencies();
    expect(firstValueFrom(result)).resolves.toEqual({
      data: {
        base: 'EUR',
        date: '2021-01-01',
        rates: {
          EUR: 1,
          USD: 1.217582,
        },
      },
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK',
    });
  });
});
