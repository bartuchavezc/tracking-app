import { Document } from 'mongoose';

export interface IEventCustomerSchema extends Document {

    readonly aggregateId: string;
    readonly event: String;
    readonly payload: {
        name: String,
        contact: String,
        meta: {
            createdAt: Date,
            deleteAt: Date,
            updateAt: Date
        }
    };
    readonly productionDate: Date

}