import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from '@/config/entities/index.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Accounts])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
