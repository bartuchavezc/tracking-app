import { IEventCustomerSchema } from "../../../Infraestructure/EventStore/Mongodb/Schema/IEventCustomerSchema";
import { Aggregate } from "mongoose";
import { IEventCustomerMerged } from "../../../Infraestructure/EventStore/Mongodb/Schema/IEventCustomerMerged";

export interface ICustomerQueryRepository {
    recover(aggregateId: String);
    getAll(): Aggregate<IEventCustomerMerged[]>;
    getById(id: string): Aggregate<IEventCustomerMerged[]>    
}