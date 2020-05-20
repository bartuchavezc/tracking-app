import { CustomerMongooseRepository } from "./Mongoose/CustomerMongooseRepositoryt";

export const CustomerRepositoryProvider = [
    {
        provide: "CustomerRepositoryProvider",
        useClass: CustomerMongooseRepository
    }
]