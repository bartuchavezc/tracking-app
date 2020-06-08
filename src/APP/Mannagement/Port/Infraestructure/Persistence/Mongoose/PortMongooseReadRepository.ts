import { Injectable, Inject } from "@nestjs/common";
import { PortMongooseDocument } from "./PortMongoodeDocuments";
import { StoreConnector } from "src/Databases/Eventstore/Mongoose/Connection";
import { Logger } from "src/APP/Shared/Logger/Logger";
import { Model } from "mongoose";
import { PortMongooseSchema } from "./PortMongooseSchema";
import { PortReadRepository } from "../../../Domain/PortReadRepository";
import { response } from "express";

@Injectable()
export class PortMongooseReadRepository implements PortReadRepository {

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

    matchAddress(address: string): Promise<any[]> {
        return new Promise(async (resolve, reject) => {
            try {
                this.model.find({ $text: { $search: address } },
                    (err, res) => {
                        if (err) { throw err }
                        resolve(res);
                    })
            } catch (error) {
                reject(error);
            }
        })
    }

    compareLocation(location: { lat: number, lng: number }): Promise<boolean> {
        return this.matchLocation(location);
    }

    matchLocation(location: { lat: number, lng: number }): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.model.find({ location: location }, (err, res) => {
                    if (err) throw err
                    res.length > 0 ? resolve(true) : resolve(false)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

}
