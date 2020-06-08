import { Injectable, Inject } from "@nestjs/common";
import { PortWriteRepository } from "../../../Domain/PortWriteRepository";
import { PortMongooseDocument } from "./PortMongoodeDocuments";
import { StoreConnector } from "src/Databases/Eventstore/Mongoose/Connection";
import { Logger } from "src/APP/Shared/Logger/Logger";
import { Model } from "mongoose";
import { PortMongooseSchema } from "./PortMongooseSchema";
import { Port } from "../../../Domain/Port";

@Injectable()
export class PortMongooseWriteRepository implements PortWriteRepository {

    private model: Model<PortMongooseDocument>

    constructor(
        @Inject("STORE_DB_CONNECTOR") private readonly connectorProvider: StoreConnector,
        @Inject("LoggerProvider") private readonly logger: Logger
    ) {
        this.connectorProvider.getConenction()
            .then(connection => {
                this.model = connection.model("port", PortMongooseSchema)
            })
            .catch(err => logger.error(err))
    }

    save(port: Port, event: String) {
        return this._save(port, event);
    }

    private _save(port: Port, event: String) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = port.toPrimitives();
                const aggegateId = port._getAggregateId().toString()

                await this.model.create({
                    event,
                    aggegateId,
                    country: data.country,
                    state: data.state,
                    city: data.city,
                    address: data.address,
                    location: data.location,
                    productionDate: new Date()
                })
                    .then(result => resolve()).catch(error => { throw error })

            } catch (error) {
                this.logger.error(error)
                reject(new Error("not found aggregateId in port"))
            }
        })
    }

}