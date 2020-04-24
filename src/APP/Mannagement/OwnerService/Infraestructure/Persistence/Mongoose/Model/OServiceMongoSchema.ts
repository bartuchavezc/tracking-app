import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const OServiceMongoSchema = new Schema({
    aggregateId: String,
    event: String,
    payload: {
        name: String,
        meta: {
            createdAt: {type: Date, default: new Date() },
            updatedAt: Date,
            deletedAt: Date
        }
    },
    productionDate: Date
})