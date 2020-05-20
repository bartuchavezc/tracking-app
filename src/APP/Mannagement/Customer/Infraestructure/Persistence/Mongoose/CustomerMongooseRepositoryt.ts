import { Injectable, Inject } from "@nestjs/common";
import { Model, Aggregate } from "mongoose";
import { CustomerMongooseDocument } from "./CustomerMongooseDocument";
import { StoreConnector } from "src/Databases/Eventstore/Mongoose/Connection";
import { Logger } from "src/APP/Shared/Domain/Logger/Logger";
import { CustomerMongooseSchema } from "./CustomerMongooseSchema";
import { Customer } from "../../../Domain/Customer";
import { CustomerRepository } from "../../../Domain/CustomerRepository";

@Injectable()
export class CustomerMongooseRepository implements CustomerRepository {

    private model: Model<CustomerMongooseDocument>

    constructor(
        @Inject("STORE_DB_CONNECTOR") private readonly connector: StoreConnector,
        @Inject("LoggerProvider") private readonly logger: Logger
    ) {
        this.connector.getConenction()
            .then(connection => {
                this.model = connection.model("customer", CustomerMongooseSchema)
            })
            .catch(err => this.logger.error(err))
    }

    async add(customer: Customer, event: String): Promise<CustomerMongooseDocument> {
        const data = customer.toPrimitives();
        return await this.model.create({
            event,
            aggregateId: data.aggregateId,
            name: data.name,
            contact: data.contact,
            _meta: data._meta,
            productionDate: new Date()
        })
    }

    getAll(): Promise<Aggregate<CustomerMongooseDocument[]>> {
        return new Promise((resolve, reject) => {
            try {
                const result = this.model.aggregate([
                    {
                        $group: {
                            _id: "$aggregateId",
                            paylaod: { $mergeObjects: { name: "$name", contact: "$contact" } },
                            _meta: { $mergeObjects: { createdAt: "$_meta.createdAt", updatedAt: "$_meta.updatedAt", deletedAt: "$_meta.deletedAt" } }
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
                payload: { $mergeObjects: { name: "$name", contact: "$contact" } },
                _meta: { $mergeObjects: { createdAt: "$_meta.createdAt", updatedAt: "$_meta.updatedAt", deletedAt: "$_meta.deletedAt" } }
            })
            .sort({ "paylaod.name": criteria.order || 1 })
    }

}