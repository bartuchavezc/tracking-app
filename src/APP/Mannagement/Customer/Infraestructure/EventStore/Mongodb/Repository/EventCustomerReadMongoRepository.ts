import { ICustomerQueryRepository } from "src/APP/Mannagement/Customer/Domain/Repository/Query/ICustomerQueryRepository";
import { Aggregate, Model } from "mongoose";
import { IEventCustomerMerged } from "../Schema/IEventCustomerMerged";
import { Inject } from "@nestjs/common";
import { IEventCustomerSchema } from "../Schema/IEventCustomerSchema";
import { EventCustomerSchema } from "../Schema/EventCustomerSchema";
import { StoreConnector } from "src/Databases/Eventstore/Mongoose/Connection";

export class EventCustomerReadMongoRepository implements ICustomerQueryRepository {

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

    getAll(): Aggregate<IEventCustomerMerged[]> {
        return this.model.aggregate([
            {
                $group: {
                    _id: "$aggregateId",
                    aggregate: { $mergeObjects: { payload: "$payload", productionDate: "$productionDate" } }
                }
            },
            {
                $sort: {
                    "aggregate.payload.name": 1
                }
            }
        ])
    }

    getById(id: string){
        return this.recover(id);
    }
    
    recover(aggregateId: string): Aggregate<IEventCustomerMerged[]> { 
        return this.model.aggregate([
            {
                $match: {aggregateId: aggregateId} 
            },
            {
                $group: {_id: "$aggregateId", aggregate: {$mergeObjects: {payload: "$payload", productionDate: "$productionDate"}}  }
            }
        ]);
    }

}