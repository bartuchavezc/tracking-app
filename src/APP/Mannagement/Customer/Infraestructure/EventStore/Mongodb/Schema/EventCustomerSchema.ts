import * as mongoose from 'mongoose'

const Schema = mongoose.Schema;

export const EventCustomerSchema = new Schema({
    aggregateId: String,
    event: String,
    payload: {
        name: String,
        contact: String,
        meta: {
            createdAt: { type: Date, default: new Date() },
            updatedAt: Date,
            deletedAt: Date
        }
    },
    productionDate: Date
    
});