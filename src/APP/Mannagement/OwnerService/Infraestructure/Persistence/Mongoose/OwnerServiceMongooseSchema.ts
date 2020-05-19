import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const OwnerServiceMongooseSchema = new Schema({
    event: String,
    aggregateId: String,
    serviceName: String,
    _meta: {
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date
    },
    productionDate: Date
})