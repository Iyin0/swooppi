import { Module } from '@nestjs/common';
import { S3ClientService } from './s3-client.service';
import { S3ClientController } from './s3-client.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [S3ClientController],
  providers: [S3ClientService],
  exports: [S3ClientService]
})
export class S3ClientModule { }
