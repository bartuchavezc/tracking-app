import { IEventCustomerSchema } from "../../../Infraestructure/EventStore/Mongodb/Schema/IEventCustomerSchema";

export interface CustomerQueryRepository {
    getAll(): Promise<IEventCustomerSchema[]>;
}