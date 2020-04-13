import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { AllCustomerQuery } from "../AllCustomerQuery";
import { Inject } from "@nestjs/common";
import { SearchAllCustomersService } from "src/APP/Mannagement/Customer/Application/SearchAll/SearchAllCustomersService";

@QueryHandler(AllCustomerQuery)
export class AllCustomerQueryHandler implements IQueryHandler<AllCustomerQuery> {

    constructor(
        @Inject("SearchAllCustomersService") private readonly searchService: SearchAllCustomersService    
    ){}

    async execute(){
        return await this.searchService.searchAll()
    }

}