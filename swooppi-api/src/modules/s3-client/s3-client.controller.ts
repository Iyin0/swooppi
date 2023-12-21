import { Controller } from '@nestjs/common';
import { S3ClientService } from './s3-client.service';

@Controller()
export class S3ClientController {
  constructor(private readonly s3ClientService: S3ClientService) {}
}
