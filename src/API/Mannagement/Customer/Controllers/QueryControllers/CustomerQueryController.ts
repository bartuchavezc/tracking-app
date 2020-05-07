import { Controller, Get, Param } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { AllCustomerQuery } from "../../Sources/Query/AllCustomerQuery";
import { OneCustomerQuery } from "../../Sources/Query/OneCustomerQuery";
import { webroutes } from "src/API/Mannagement/Shared/application/webroutes";

@Controller(`${webroutes.MannagementModuleRoutePrefix}/customer`)
export class CustomerQueryController {

    constructor(
        private readonly queryBus: QueryBus
    ){}

    @Get()
    async getAll(){
        return await this.queryBus.execute(new AllCustomerQuery())
    }

    @Get(":id")
    async getById(@Param("id") id: string){
        return await this.queryBus.execute(new OneCustomerQuery(id))
    }

}
