import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TocMongooseSchema = new Schema({
    event: String,
    aggregateId: String,
    cargo: String,
    _meta: {
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date
    },
    
    productionDate: Date
});
