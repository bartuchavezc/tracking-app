import { CustomerStoreRepository } from "src/APP/Mannagement/Customer/Domain/Repository/EventStore/CustomerStoreRepository";
import { Inject, Injectable } from "@nestjs/common";
import { CustomerEvent } from "../../CustomerEvent";
import { StoreConnector } from "src/Databases/Eventstore/Mongoose/Connection";
import { EventCustomerSchema } from "../Schema/EventCustomerSchema";
import { Model, Aggregate } from "mongoose";
import { IEventCustomerSchema } from "../Schema/IEventCustomerSchema";
import { IEventCustomerMerged } from "../Schema/IEventCustomerMerged";

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

    add(event: CustomerEvent): Promise<CustomerEvent> {
        return new Promise(async (resolve, reject) => {
            await this.model.create(event)
                .then(result => {
                    resolve(
                        new CustomerEvent(result.aggregateId, result.event, result.payload, result.productionDate))
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    back(){}

    

}