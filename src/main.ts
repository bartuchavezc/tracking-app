import { NestFactory } from '@nestjs/core';
import { ServerModule } from './API/Server.module';

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);
  await app.listen(8080);
}
bootstrap();
