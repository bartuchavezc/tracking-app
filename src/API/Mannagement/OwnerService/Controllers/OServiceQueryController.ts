import { Controller, Get, Param, Req, Res } from "@nestjs/common";
import { WebController } from "../../Shared/application/nest/WebController";
import { QueryBus } from "@nestjs/cqrs";
import { NestOServiceAllQuery } from "../Sources/Query/NestOServicesAllQuery";
import { NestOServiceCriteriaQuery } from "../Sources/Query/NestOServiceCriteriaQuery";
import { webroutes } from "../../Shared/application/webroutes";
import { request } from "express";

@Controller(`${webroutes.MannagementModuleRoutePrefix}/services`)
export class OServiceQueryController extends WebController {

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


    async getAll(){
        return this.queryBus.execute(new NestOServiceAllQuery())
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
        return await this.queryBus.execute(new NestOServiceCriteriaQuery(query))
        .then(result => {
            this.resposneWithData(result);
        })
        .catch(error => {
            this.responseWithError(error)
        })
    }

}