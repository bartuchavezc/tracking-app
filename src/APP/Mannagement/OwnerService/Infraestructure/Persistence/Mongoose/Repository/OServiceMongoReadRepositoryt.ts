import { OServiceReadRepository } from "src/APP/Mannagement/OwnerService/Domain/Repository/OServiceReadRepository";
import { OServiceEvent } from "../../OServiceModel";
import { Model } from "mongoose";
import { IOServiceMerged } from "../Model/IOserviceMerged";
import { Inject } from "@nestjs/common";
import { StoreConnector } from "src/Databases/Eventstore/Mongoose/Connection";
import { OServiceMongoSchema } from "../Model/OServiceMongoSchema";

export class OServiceMongoReadRepository implements OServiceReadRepository {

    private model: Model<IOServiceMerged>

    constructor(
        @Inject("STORE_DB_CONNECTOR") private readonly connectorProvider: StoreConnector
    ){
        this.connectorProvider.getConenction()
        .then(connection => {
            this.model = connection.model("OwnerService", OServiceMongoSchema)
        })
    }

    async getAll(): Promise<IOServiceMerged[]> {
        return await this.model.aggregate([
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

}