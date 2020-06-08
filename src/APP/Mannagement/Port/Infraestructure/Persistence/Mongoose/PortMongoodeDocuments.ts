import { Document } from "mongoose";

export interface PortMongooseDocument extends Document {
    readonly event: String,
    readonly aggreateId: String,
    
    readonly country: String,
    readonly state: String,
    readonly city: String,
    readonly address: String,
    readonly location: {
        lat: Number,
        lng: Number
    }
}