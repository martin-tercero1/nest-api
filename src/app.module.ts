import { ConfigModule } from '@nestjs/config';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/controllers/products.controller';
import { CategoriesController } from './products/controllers/categories.controller';
import { OrdersController } from './orders/controllers/orders.controller';
import { UsersController } from './users/controllers/users.controller';
import { BrandsController } from './products/controllers/brands.controller';
import { CustomersController } from './users/controllers/customers.controller';
import { OrdersModule } from './orders/orders.module';

import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { DatabaseModule } from './database/database.module';
import { environments } from './environments';
import config from './config';

import * as Joi from 'joi';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    HttpModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath:
        environments[process.env.NODE_ENV as keyof typeof environments] ||
        '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const request = http.get('https://jsonplaceholder.typicode.com/todos');
        const tasks = await lastValueFrom(request);
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
