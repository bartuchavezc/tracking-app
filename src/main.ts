import { NestFactory } from '@nestjs/core';
import { ServerModule } from './API/Server.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);
  app.enableCors()
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 8080);
}

bootstrap();
