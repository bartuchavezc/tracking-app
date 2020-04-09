import { Document } from 'mongoose'

export interface MongoCustomer extends Document{

    readonly aggregateId: string,
    readonly status: string,
    readonly payload: {
        customerName: string,
        customerContact: string
    },
    readonly meta: {
        title: string,
        author: string,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date
    }

}