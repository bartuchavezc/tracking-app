import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { OneCustomerQuery } from "../OneCustomerQuery";
import { Inject } from "@nestjs/common";
import { SearchCustomerByCriteriaService } from "src/APP/Mannagement/Customer/Application/Services/Search/SearchCustomerByCriteriaService";

@QueryHandler(OneCustomerQuery)
export class OneCustomerQueryHandler implements IQueryHandler<OneCustomerQuery>{

    constructor(
        @Inject("GetOneCustomerService") private readonly getService: SearchCustomerByCriteriaService
    ) { }

    async execute(query: OneCustomerQuery) {
        return new Promise(async (resolve, reject) => {
            await this.getService
                .getById(query.id)
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    reject(error);
                })
        })
    }

}