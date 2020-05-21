import { Controller, Get, Req, Param, Res } from "@nestjs/common";
import { WebController } from "../../Shared/application/nest/WebController";
import { webroutes } from "../../Shared/application/webroutes";
import { QueryBus } from "@nestjs/cqrs";
import { NestTocsQuery } from "../Sources/Query/NestTocsQuery";
import { NestSearchTocsByCriteriaQuery } from "../Sources/Query/NestSearchTocsByCreiteriaQuery";
import { NestSearchOneTypeOfCargoQuery } from "../Sources/Query/NestSearchOneTypeOfCargoQuery";

@Controller(`${webroutes.MannagementModuleRoutePrefix}/type-of-cargo`)
export class TocQueryController extends WebController {

    constructor(
        private readonly queryBus: QueryBus
    ) {
        super()
    }

    @Get()
    getAll(@Req() request, @Res() response) {
        this.response = response;
        Object.entries(request.body).length > 0
            ? this._searchByCreiteria(request.body)
            : this._getAll();
    }

    @Get(":id")
    getOne(@Param("id") aggregateId: string, @Res() response){
        this.response = response;
        this._getOne(aggregateId);
    }

    private async _searchByCreiteria(
        query: { filters?: []; orderBy?: String; order?: String; offset?: Number, limit?: Number }
    ) {
        return await this.queryBus.execute(new NestSearchTocsByCriteriaQuery(query))
            .then(result => this.resposneWithData(result))
            .catch(err => this.responseWithError(err))
    }

    private async _getOne(aggregateId: string) {
        return this.queryBus.execute(new NestSearchOneTypeOfCargoQuery(aggregateId))
            .then(result => this.resposneWithData(result))
            .catch(error => this.responseWithError(error))
    }

    private async _getAll() {
        return await this.queryBus.execute(new NestTocsQuery())
            .then(result => this.resposneWithData(result))
            .catch(err => this.responseWithError(err))
    }

}