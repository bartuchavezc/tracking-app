import { Document } from 'mongoose'

export interface MongoCustomer extends Document{


    readonly event: string,
    readonly aggregateId: string,
    readonly status: string,
    readonly payload: {
        customerName: string,
        customerContact: string
    },
    readonly meta: {
        author: string,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date
    }

}