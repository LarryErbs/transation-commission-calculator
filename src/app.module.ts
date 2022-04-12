import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TransactionsModule } from './domain/transaction/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        EXCHANGE_RATE_API_URL: Joi.string().required(),
      }),
    }),
    TransactionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
