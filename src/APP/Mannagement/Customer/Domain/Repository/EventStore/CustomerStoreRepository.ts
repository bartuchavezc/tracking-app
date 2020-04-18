import { CustomerEvent } from "../../../Infraestructure/EventStore/CustomerEvent";
import { Aggregate } from "mongoose";
import { IEventCustomerMerged } from "../../../Infraestructure/EventStore/Mongodb/Schema/IEventCustomerMerged";

export interface CustomerStoreRepository {
    add(event: CustomerEvent): Promise<CustomerEvent>;
    back(aggregateId: String);
    recover(aggregateId: String);
    getAll(): Aggregate<IEventCustomerMerged[]>;
    getById(id: string): Aggregate<IEventCustomerMerged[]>
}