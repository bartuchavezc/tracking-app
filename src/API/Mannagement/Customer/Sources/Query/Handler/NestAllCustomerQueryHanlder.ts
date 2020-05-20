import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { NestAllCustomerQuery } from "../NestAllCustomerQuery";
import { Inject } from "@nestjs/common";

import { SearchCustomersService } from "src/APP/Mannagement/Customer/Application/Services/Search/SearchCustomerService";
import { AllCustomerQuery } from "src/APP/Mannagement/Customer/Application/Query/AllCustomerQuery";

@QueryHandler(NestAllCustomerQuery)
export class NestAllCustomerQueryHandler implements IQueryHandler<NestAllCustomerQuery> {

    constructor(
        @Inject("SearchAllCustomersService") private readonly service: SearchCustomersService
    ) { }

    execute(query: AllCustomerQuery){
        return this.service.search()    
    }

}