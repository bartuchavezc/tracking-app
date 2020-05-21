import { Controller, Get, Param, Req, Res } from "@nestjs/common";
import { WebController } from "../../Shared/application/nest/WebController";
import { QueryBus } from "@nestjs/cqrs";
import { NestOServiceAllQuery } from "../Sources/Query/NestOServicesAllQuery";
import { NestOServiceCriteriaQuery } from "../Sources/Query/NestOServiceCriteriaQuery";
import { webroutes } from "../../Shared/application/webroutes";
import { request } from "express";
import { NestOneOServiceQuery } from "../Sources/Query/NestOneOServiceQuery";

@Controller(`${webroutes.MannagementModuleRoutePrefix}/services`)
export class OServiceQueryController extends WebController {

    constructor(
        private queryBus: QueryBus
    ) {
        super();
    }

    @Get()
    getAll(@Req() request, @Res() response) {
        this.response = response;
        Object.entries(request.body).length > 0
            ? this._searchByCrteria(request.body)
            : this._getAll();
    }

    @Get(":id")
    getOne(@Param("id") aggregateId: string, @Res() response) {
        this.response = response;
        this._getOne(aggregateId)
    }

    private async _getAll() {
        return this.queryBus.execute(new NestOServiceAllQuery())
            .then(result => {
                this.resposneWithData(result)
            })
            .catch(error => {
                this.responseWithError(error)
            })
    }

    private async _getOne(aggregateId: string) {
        return await this.queryBus.execute(new NestOneOServiceQuery(aggregateId))
            .then(result => {
                this.resposneWithData(result);
            })
            .catch(error =>{
                this.responseWithError(error);
            })
    }

    private async _searchByCrteria(
        query: { filters?: []; orderBy?: String; order?: String; offset?: Number, limit?: Number }
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