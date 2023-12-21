import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useGlobalFilters(new HttpExceptionFilter())

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT')

  await app.listen(port);

  Logger.log(`Server running on PORT ${port}`)
}
bootstrap();
