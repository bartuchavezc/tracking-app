import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { SearchCustomerByCriteriaService } from "src/APP/Mannagement/Customer/Application/Services/Search/SearchCustomerByCriteriaService";
import { ByCriteriaCustomerQuery } from "src/APP/Mannagement/Customer/Application/Query/ByCriteriaCustomerQuery";
import { NestByCriteriaCustomerQuery } from "../NestByCriteriaCustomerQuery";

@QueryHandler(NestByCriteriaCustomerQuery)
export class NestByCriteriaCustomerQueryHandler implements IQueryHandler<NestByCriteriaCustomerQuery>{

    constructor(
        @Inject("CustomerByCriteriaSearcher") private readonly service: SearchCustomerByCriteriaService
    ) { }

    execute(query: ByCriteriaCustomerQuery) {
        return this.service.search(query.__primitives())    
    }

}