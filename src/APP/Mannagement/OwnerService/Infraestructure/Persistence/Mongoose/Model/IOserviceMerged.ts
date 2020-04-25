import { Document } from "mongoose"

export interface IOServiceMerged extends Document{

    readonly _id: string;
    readonly event: String;

    readonly aggregate: {
        payload: {
            name: String,
            contact: String,
            meta: {
                createdAt: Date,
                deletedAt: Date,
                updatedAt: Date
            }
        },
        productionDate: Date
    }

}