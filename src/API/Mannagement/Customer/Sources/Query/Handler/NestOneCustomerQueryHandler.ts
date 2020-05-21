import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { NestOneCustomerQuery } from "../NestOneCustomerQuery";
import { SearchOneCustomer } from "src/APP/Mannagement/Customer/Application/Services/Search/SearchOneCustomer";

@QueryHandler(NestOneCustomerQuery)
export class NestOneCustomerQueryHandler implements IQueryHandler<NestOneCustomerQuery>{

    constructor(
        @Inject("OneCustomerSearch") private readonly service: SearchOneCustomer
    ) { }

    execute(query: NestOneCustomerQuery) {
        return this.service.search(query.aggregateId)    
    }

}