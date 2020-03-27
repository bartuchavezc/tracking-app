import { ConfigService } from '@nestjs/config';
import { Connection, createConnection } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DbCommandConnection {

    constructor(@Inject('config_service') private config: ConfigService) { }

    public getConnection(): Promise<Connection> {
        return this.connect();
    }

    async connect(): Promise<Connection> {
        return await createConnection({
            type: 'mysql',
            host: this.config.get<string>('COMMAND_DB_HOST'),
            port: parseInt(this.config.get<string>('COMMAND_DB_PORT')),
            username: this.config.get<string>('COMMAND_DB_USERNAME'),
            password: this.config.get<string>('COMMAND_DB_PASSWORD'),
            database: this.config.get<string>('COMMAND_DB_NAME'),
            entities: ["dist/**/*.entity{.ts,.js}"],
            synchronize: true
        })
    }

}