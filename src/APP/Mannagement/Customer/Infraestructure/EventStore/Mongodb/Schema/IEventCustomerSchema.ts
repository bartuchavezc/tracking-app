import { Document } from 'mongoose';

export interface IEventCustomerSchema extends Document {

    readonly aggregateId: string;
    readonly event: String;
    readonly payload: {
        name: String,
        contact: String,
        meta: {
            createdAt: Date,
            deletedAt: Date,
            updatedAt: Date
        }
    };
    readonly productionDate: Date

}