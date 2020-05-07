import { Injectable, Inject } from "@nestjs/common";
import { OServiceWriteRepository } from "src/APP/Mannagement/OwnerService/Domain/Repository/OServiceWriteRepository";
import { IOServiceMognoSchema } from "../Model/IOServiceMongoSchema";
import { Model } from "mongoose";
import { StoreConnector } from "src/Databases/Eventstore/Mongoose/Connection";
import { OServiceMongoSchema } from "../Model/OServiceMongoSchema";
import { OServiceEvent } from "../../OServiceModel";

@Injectable()
export class OServiceMongoRepository implements OServiceWriteRepository {

    private model: Model<IOServiceMognoSchema>

    constructor(
        @Inject("STORE_DB_CONNECTOR") private readonly connectorProvider: StoreConnector
    ) {
        this.connectorProvider.getConenction()
            .then(connection => {
                this.model = connection.model("OwnerService", OServiceMongoSchema)
            })
    }

    add(service: OServiceEvent): Promise<OServiceEvent> {
        return new Promise(async (resolve, reject) => {
            try {

                await this.model
                    .create(service)
                    .then(result => { resolve(service) })
                    .catch(error => { throw error })

            } catch (error) {

                reject(error);
            }
        })
    }
}