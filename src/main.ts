import { NestFactory } from '@nestjs/core';
import { ServerModule } from './API/Server.module';
import { createConnection } from 'typeorm';

async function bootstrap() {

  createConnection({
    name: "ComandsDatabase",
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "testDatabase",
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true
  })
    .then(async () => {
      const app = await NestFactory.create(ServerModule);

      app.setGlobalPrefix('api')
      await app.listen(8080);
    })
    .catch(e => console.error('TypeORM connection error: ', e))

}
bootstrap();
