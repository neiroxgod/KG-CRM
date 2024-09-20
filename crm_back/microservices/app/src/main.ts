import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();
async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.createMicroservice(AppModule, {
    logger: ['error', 'warn', 'debug', 'verbose', 'log'],
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: parseInt(process.env.APP_PORT) || 7003,
    },
  });

  await app.listen();
  console.log(
    `APP microservice is listening on port ${process.env.APP_HOST}:${process.env.APP_PORT}`,
  );
}
bootstrap();
