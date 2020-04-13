import { CustomerEvent } from "../../../Infraestructure/EventStore/CustomerEvent";

export interface CustomerStoreRepository {
    add(event: CustomerEvent): Promise<any>;
    back(aggregateId: String);
    recover(aggregateId: String);
    getAll();
}