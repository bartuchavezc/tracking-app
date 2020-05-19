import { Document } from 'mongoose'

export interface OwnerServiceMongooseDocument extends Document {

    readonly event: String;
    readonly aggregateId: string;
    readonly serviceName: String;
    readonly productionDate: Date;
    readonly _meta?: {
        createdAt?: Date,
        updatedAt?: Date,
        deletedAt?: Date

    }
}