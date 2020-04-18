import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { AllCustomerQuery } from "../AllCustomerQuery";
import { Inject } from "@nestjs/common";

import { SearchCustomersService } from "src/APP/Mannagement/Customer/Application/Services/Search/SearchCustomerService";
import { CustomerResponseDTO } from "src/APP/Mannagement/Customer/Application/CustomerReponseDTO";

@QueryHandler(AllCustomerQuery)
export class AllCustomerQueryHandler implements IQueryHandler<AllCustomerQuery> {

    constructor(
        @Inject("SearchAllCustomersService") private readonly searchService: SearchCustomersService
    ) { }

    execute(): Promise<CustomerResponseDTO[]> {
        return new Promise(async (resolve, reject) => {
            await this.searchService
                .searchAll()
                .then(result => {
                    resolve(result.map(customer => 
                        new CustomerResponseDTO(customer.id.toString(), customer.name, customer.contact)
                    ))
                })
                .catch(err => reject(err))
        })
    }

}