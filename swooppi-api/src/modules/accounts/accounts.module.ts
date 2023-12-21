import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts, Cart } from '@/config/entities/index.entities';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '@/config/jwt.config';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync(jwtConfig),
    TypeOrmModule.forFeature([Accounts, Cart]),
  ],
  controllers: [AccountsController],
  providers: [
    AccountsService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AccountsModule { }
