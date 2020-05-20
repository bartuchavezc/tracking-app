import { Document } from "mongoose";

export interface CustomerMongooseDocument extends Document {
    readonly event: String;
    readonly aggregateId: string,
    readonly name: String,
    readonly contact: String,
    readonly _meta?: {
        createdAt?: Date,
        deletedAt?: Date,
        updatedAt?: Date
    }
}