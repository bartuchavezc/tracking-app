import * as mongoose from 'mongoose';
import { Connection } from 'mongoose'

import { ConfigService } from '@nestjs/config';
import { Inject } from '@nestjs/common';

export class DbQueryConnection {

    constructor(@Inject('config_service') private config: ConfigService) {}

    public getConenction(){
        return this.connect()
    }

    async connect(): Promise<Connection> {

        return await mongoose.createConnection(
            `mongodb://${this.config.get<string>('QUERY_DB_HOST')}:${this.config.get<string>('QUERY_DB_PORT')}/${this.config.get<string>('QUERY_DB_NAME')}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
    }
}