import { TocRepository } from "../../../Domain/TocRepository";
import { Injectable, Inject, Type } from "@nestjs/common";
import { StoreConnector } from "src/Databases/Eventstore/Mongoose/Connection";
import { Logger } from "src/APP/Shared/Domain/Logger/Logger";
import { TocMongooseSchema } from "./TocMongooseSchema";
import { TocMongooseDocument } from "./TocMongooseDocument";
import { Model, Aggregate } from "mongoose";
import { TypeOfCargo } from "../../../Domain/TypeOfCargo";

@Injectable()
export class TocMongooseRepository implements TocRepository {

    private model: Model<TocMongooseDocument>;

    constructor(
        @Inject("STORE_DB_CONNECTOR") private readonly connectorProvider: StoreConnector,
        @Inject("LoggerProvider") private readonly logger: Logger
    ) {
        this.connectorProvider.getConenction()
            .then(connection => {
                this.model = connection.model("typeofcargo", TocMongooseSchema)
            })
            .catch(err => logger.error(err))
    }

    /**
     * 
     * @param toc Type Of Cargo Domain Object
     * @param event the event name that run this;
     */
    async add(toc: TypeOfCargo, event: String): Promise<TocMongooseDocument> {
        const data = toc.toPrimitives();
        return await this.model.create({
            event, aggregateId: data.aggregateId, cargo: data.cargo, _meta: data._meta, productionDate: new Date()
        })
    }

    getAll(): Promise<Aggregate<TocMongooseDocument[]>> {
        return new Promise((resolve, reject) => {
            try {
                const result = this.model.aggregate([
                    {
                        $group: {
                            _id: "$aggregateId",
                            payload: { $mergeObjects: { cargo: "$cargo" } },
                            _meta: { $mergeObjects: { createdAt: "$_meta.createdAt", updatedAt: "$_meta.updatedAt", deletedAt: "$_meta.deletedAt" } }
                        }
                    },
                    {
                        $sort: {
                            "payload.cargo": 1
                        }
                    }
                ]);

                resolve(result);

            } catch (error) {
                reject(error);
            }
        });
    }

    getByCriteria(criteria: { aggregateId?: string; filters?: []; orderBy?: String; order?: String; offset?: Number, limit?: Number }) {
        return this.model.aggregate()
            .match({ aggregateId: criteria.aggregateId })
            .group({
                _id: "$aggregateId",
                payload: { $mergeObjects: { cargo: "$cargo" } },
                _meta: { $mergeObjects: { createdAt: "$_meta.createdAt", updatedAt: "$_meta.updatedAt", deletedAt: "$_meta.deletedAt" } }
            })
            .sort({ "payload.cargo": criteria.order || 1 })
    }
}
