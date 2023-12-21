import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart, CartItems, Products } from '@/config/entities/index.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products, Cart, CartItems])
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule { }
