import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountsModule } from './modules/accounts/accounts.module';
import { ProductsModule } from './modules/products/products.module';
import envConfig from './config/env.config';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/accounts/jwt-auth.guard';
import { CartModule } from './modules/cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ['.env'],
      load: [envConfig],
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    AccountsModule,
    ProductsModule,
    UserModule,
    CartModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
