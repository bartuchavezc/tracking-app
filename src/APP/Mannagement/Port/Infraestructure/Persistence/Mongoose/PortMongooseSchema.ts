import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const PortMongooseSchema = new Schema({
    
    event: String,
    aggreateId: String,
    
    country: String,
    state: String,
    city: String,
    address: String,
    location: {
        lat: Number,
        lng: Number
    },

    productionDate: Date
}).index({address: "text"})