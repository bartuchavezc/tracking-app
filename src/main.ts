import { NestFactory } from '@nestjs/core';
import { ServerModule } from './API/Server.module';

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);

  app.setGlobalPrefix('api')
  await app.listen(8080);
}

bootstrap();
