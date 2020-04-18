import { Document } from 'mongoose';

export interface IEventCustomerMerged extends Document {

    readonly aggregateId: string;
    readonly event: String;
    
    readonly aggregate: {
        payload: {
            name: String,
            contact: String,
            meta: {
                createdAt: Date,
                deleteAt: Date,
                updateAt: Date
            }
        };
        productionDate: Date
    }

}