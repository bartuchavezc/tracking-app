import { Customer } from "./Customer";

export interface CustomerRepository {
    add(cusotmer: Customer, eventName: String);
    getAll();
    getByCriteria(criteria);
}