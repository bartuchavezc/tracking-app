import { EventCustomerMongoRepository } from "./EventCustomerMongoRepository";
import { EventCustomerReadMongoRepository } from "./EventCustomerReadMongoRepository";

export const CustomerRepositoryProviders = [
    {
        provide: 'CustomerStoreRepository',
        useClass: EventCustomerMongoRepository
    },
    {
        provide: 'CustomerQueryRepository',
        useClass: EventCustomerReadMongoRepository
    },
]