import * as mongoose from 'mongoose'

const Schema = mongoose.Schema;

export const CustomerSchema = new Schema({
    aggregateId: String,
    status: String,
    payload: {
        customerName: String,
        customerContact: String,
    },
    meta: {
        title: String,
        author: String,
        createdAt: { type: Date, default: Date.now },
        updatedAt: Date,
        deletedAt: Date
    }
})