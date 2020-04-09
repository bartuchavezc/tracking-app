import { MongoCustomer } from "../../../Infraestructure/EventStore/Mongoose/Schema/MongoCustomer";

export interface CustomerStoreRepository {
    add(customer: object): Promise<MongoCustomer>;
}