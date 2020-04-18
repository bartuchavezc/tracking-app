import { Inject } from "@nestjs/common";
import { CustomerStoreRepository } from "src/APP/Mannagement/Customer/Domain/Repository/EventStore/CustomerStoreRepository";
import { Schema } from "mongoose";

export class CustomerEvent{

    constructor(
        readonly aggregateId: string,
        readonly event: String,
        readonly payload,
        readonly productionDate: Date
    ){}

}