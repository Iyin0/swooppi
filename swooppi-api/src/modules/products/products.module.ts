import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts, ProductCategories, Products } from '@/config/entities/index.entities';
import { S3ClientModule } from '../s3-client/s3-client.module';

@Module({
  imports: [
    S3ClientModule,
    TypeOrmModule.forFeature([Accounts, Products, ProductCategories]),],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule { }
