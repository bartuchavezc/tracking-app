import { Injectable, Inject } from '@nestjs/common';
import { Model, Connection } from 'mongoose'

import { MongoCustomer } from './Schema/MongoCustomer';
import { DbQueryConnection } from 'src/Databases/QuerysDB/DbQueryConnection';
import { CustomerSchema } from './Schema/CustomerAgregate.schema';
import { CustomerCreateCommand } from 'src/API/Mannagement/Customer/Commands/CustomerCreateCommand';

@Injectable()
export class CustomerStoreMongooseRepository {

    private model: Model<MongoCustomer>;
    private connection: Promise<Connection>;

    constructor(
        @Inject('QUERY_DB_CONNECTION') private dbQueryConnection: DbQueryConnection
    ) {
        this.connection = this.dbQueryConnection.getConenction()
        this.connection.then(result => {
            this.model = result.model('Customer', CustomerSchema);
        });
    }

    public async add({ event, id, status, payload, meta }:
        {   
            event: String;
            id: string,
            status: string,
            payload: { customerName: string, customerContact: string },
            meta: { createdAt: Date }
        })
        {

        return await this.model.create({ event , aggregateId: id, status, payload, meta })

    }


}