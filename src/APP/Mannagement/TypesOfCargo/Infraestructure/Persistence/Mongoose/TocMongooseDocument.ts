import { Document } from 'mongoose';

export interface TocMongooseDocument extends Document {

    readonly event: String;
    readonly aggregateId: string,
    readonly cargo: String,
    readonly productionDate: Date
    readonly _meta?: {
        createdAt?: Date,
        deletedAt?: Date,
        updatedAt?: Date
    }

}