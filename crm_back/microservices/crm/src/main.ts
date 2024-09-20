import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: parseInt(process.env.CRM_PORT) || 7002,
    },
  });

  await app.listen();
  console.log(
    `CRM microservice is listening on port ${process.env.CRM_HOST}:${process.env.CRM_PORT}`,
  );
}
bootstrap();
