import { CustomerStoreRepository } from "src/APP/Mannagement/Customer/Domain/Repository/EventStore/CustomerStoreRepository";
import { Inject, Injectable } from "@nestjs/common";
import { CustomerEvent } from "../../CustomerEvent";
import { StoreConnector } from "src/Databases/Eventstore/Mongoose/Connection";
import { EventCustomerSchema } from "../Schema/EventCustomerSchema";
import { Model } from "mongoose";
import { IEventCustomerSchema } from "../Schema/IEventCustomerSchema";

@Injectable()
export class EventCustomerMongoRepository implements CustomerStoreRepository {

    private model: Model<IEventCustomerSchema>;

    constructor(
        @Inject("STORE_DB_CONNECTOR") private readonly connectorProvider: StoreConnector
    ) {
        this.connectorProvider.getConenction()
            .then(connection => {
                this.model = connection.model("Customer", EventCustomerSchema)
            })
            .catch(err => {
                throw err;
            })
    }

    async add(event: CustomerEvent): Promise<any> {
        await this.model.create(event);
    }

    async getAll(){
        return await this.model.find() 
    }

    back(aggregateId: String) { }

    recover() { }

}