import { Customer } from "./Customer";

export interface CustomerRepository {
    getById(aggregateId: string);
    add(cusotmer: Customer, eventName: String);
    getAll();
    getByCriteria(criteria);
}