import { Injectable, Inject } from "@nestjs/common";
import { OwnerServicerepository } from "../../../Domain/OwnerServiceRepository";
import { StoreConnector } from "src/Databases/Eventstore/Mongoose/Connection";
import { Logger } from "src/APP/Shared/Domain/Logger/Logger";
import { OwnerService } from "../../../Domain/OwnerService";
import { OwnerServiceMongooseDocument } from "./OwnerServiceMongooseDocument";
import { Model, Aggregate } from "mongoose";
import { OwnerServiceMongooseSchema } from "./OwnerServiceMongooseSchema";

@Injectable()
export class OwnerServiceMongooseRepository implements OwnerServicerepository {

    private model: Model<OwnerServiceMongooseDocument>

    constructor(
        @Inject("STORE_DB_CONNECTOR") private readonly connector: StoreConnector,
        @Inject("LoggerProvider") private readonly logger: Logger
    ) {
        this.connector.getConenction()
            .then(connection => {
                this.model = connection.model("ownerservice", OwnerServiceMongooseSchema)
            })
            .catch(err => this.logger.error(err))
    }

    async add(oservice: OwnerService, event: String): Promise<OwnerServiceMongooseDocument> {
        const data = oservice.toPrimitives();
        return await this.model.create({
            event,
            aggregateId: data.aggregateId,
            serviceName: data.serviceName,
            _meta: data._meta,
            productionDate: new Date()
        });
    }

    getAll(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            try {
                const result = this.model.aggregate([
                    {
                        $group: {
                            _id: "$aggregateId",
                            payload: { $mergeObjects: { serviceName: "$serviceName" } },
                            _meta: { $mergeObjects: { createdAt: "$_meta.createdAt", updatedAt: "$_meta.updatedAt", deletedAt: "$_meta.deletedAt" } }
                        }
                    },
                    {
                        $sort: {
                            "payload.serviceName": 1
                        }
                    }
                ]);

                resolve(result)

            } catch (error) {
                reject(error);
            }
        })
    }

    getByCriteria(criteria: { aggregateId?: string; filters?: []; orderBy?: String; order?: String; offset?: Number, limit?: Number }) {
        return this.model.aggregate()
            .match({ aggregateId: criteria.aggregateId })
            .group({
                _id: "$aggregateId",
                payload: { $mergeObjects: { serviceName: "$serviceName" } },
                _meta: { $mergeObjects: { createdAt: "$_meta.createdAt", updatedAt: "$_meta.updatedAt", deletedAt: "$_meta.deletedAt" } }
            })
            .sort({ "payload.serviceName": criteria.order || 1 })
    }

}