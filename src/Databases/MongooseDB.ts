import * as mongoose from 'mongoose';
import { Connection } from 'mongoose'

import { ConfigService } from '@nestjs/config';
import { Inject } from '@nestjs/common';

export class MongooseDB {

    constructor(@Inject('config_service') private config: ConfigService) {}

    public getConenction(){
        return this.connect()
    }

    private async connect(): Promise<Connection> {

        return await mongoose.createConnection(
            process.env.MONGODB_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
    }
}