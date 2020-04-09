import { Injectable, Inject } from '@nestjs/common';
import { Model, Connection } from 'mongoose'

import { MongoCustomer } from './Schema/MongoCustomer';
import { DbQueryConnection } from 'src/Databases/QuerysDB/DbQueryConnection';
import { CustomerSchema } from './Schema/CustomerAgregate.schema';

@Injectable()
export class CustomerStoreMongooseRepository {

    private model: Model<MongoCustomer>;
    private connection: Promise<Connection>;

    constructor(
        @Inject('QUERY_DB_CONNECTION') private dbQueryConnection: DbQueryConnection
    ) {
        this.connection = this.dbQueryConnection.getConenction()
        this.connection.then(result => {
            this.model = result.model('CustomerAgregate', CustomerSchema);
        });
    }

    public async add({ id, status, payload, meta }:
        {   id: string,
            status: string,
            payload: { customerName: string, customerContact: string },
            meta: { title: string, createdAt: Date }
        })
        {

        return await this.model.create({ aggregateId: id,status, payload, meta })

    }


}