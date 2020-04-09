import * as mongoose from 'mongoose'

const Schema = mongoose.Schema;

export const CustomerSchema = new Schema({
    event: String,
    aggregateId: String,
    status: String,
    payload: {
        customerName: String,
        customerContact: String,
    },
    meta: {
        author: String,
        createdAt: { type: Date, default: new Date() },
        updatedAt: Date,
        deletedAt: Date
    }
});