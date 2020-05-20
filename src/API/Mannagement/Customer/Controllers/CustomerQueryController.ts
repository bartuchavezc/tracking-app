import { Controller, Get, Param, Req, Res } from "@nestjs/common";
import { WebController } from "../../Shared/application/nest/WebController";
import { QueryBus } from "@nestjs/cqrs";
import { webroutes } from "../../Shared/application/webroutes";
import { NestByCriteriaCustomerQuery } from "../Sources/Query/NestByCriteriaCustomerQuery";
import { NestAllCustomerQuery } from "../Sources/Query/NestAllCustomerQuery";

@Controller(`${webroutes.MannagementModuleRoutePrefix}/customer`)
export class CustomerQueryController extends WebController {

    constructor(
        private queryBus: QueryBus
    ) {
        super();
    }

    @Get()
    __invoke(@Req() request, @Res() response) {
        this.response = response;
        Object.entries(request.body).length > 0
            ? this.searchByCrteria(request.body)
            : this.getAll();
    }


    async getAll() {
        return this.queryBus.execute(new NestAllCustomerQuery())
            .then(result => {
                this.resposneWithData(result)
            })
            .catch(error => {
                this.responseWithError(error)
            })
    }

    async searchByCrteria(
        query: { aggregateId?: string; filters?: []; orderBy?: String; order?: String; offset?: Number, limit?: Number }
    ) {
        return await this.queryBus.execute(new NestByCriteriaCustomerQuery(query))
            .then(result => {
                this.resposneWithData(result);
            })
            .catch(error => {
                this.responseWithError(error)
            })
    }

}