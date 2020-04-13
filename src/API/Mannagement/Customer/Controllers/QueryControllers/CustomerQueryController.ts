import { AppConfig } from "../../../Shared/app.config";

import { Controller, Get } from "@nestjs/common";
import { Customer } from "src/APP/Mannagement/Customer/Domain/Customer";
import { QueryBus } from "@nestjs/cqrs";
import { AllCustomerQuery } from "../../Query/AllCustomerQuery";

@Controller(`${AppConfig.MainRoute}/customer`)
export class CustomerQueryController {

    constructor(
        private readonly queryBus: QueryBus
    ){}

    @Get()
    async getAll(): Promise<Customer[]> {
        return await this.queryBus.execute(new AllCustomerQuery())    
    }

}
