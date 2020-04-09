import { MongoCustomer } from "../Schema/MongoCustomer";

export const mapped = (customer) => {
    return {
        id: customer.aggregateId,
        name: customer.payload.customerName,
        contact: customer.payload.customerContact,
        createdAt: customer.meta.createdAt
    }
} 