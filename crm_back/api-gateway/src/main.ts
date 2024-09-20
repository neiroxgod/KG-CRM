import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

config();

async function bootstrap() {
  const PORT = process.env.PORT || 7000;
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  const uploadDir = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Документация API')
    .setDescription('Документация API')
    .setVersion('1.0.0')
    .addTag('API-GATEWAY')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () =>
    console.log(`Servers started on port = ${PORT}`),
  );
}
bootstrap();
