import * as mongoose from 'mongoose'; 

const Schema = mongoose.Schema;

export const CustomerMongooseSchema = new Schema({
    event: String,
    aggregateId: String,
    name: String,
    contact: String,
    _meta: {
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date
    },
    productionDate: Date
});