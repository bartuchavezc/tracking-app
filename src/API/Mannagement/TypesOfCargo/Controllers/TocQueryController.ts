import { Controller, Get, Req, Param, Res } from "@nestjs/common";
import { WebController } from "../../Shared/application/nest/WebController";
import { webroutes } from "../../Shared/application/webroutes";
import { QueryBus } from "@nestjs/cqrs";
import { NestTocsQuery } from "../Sources/Query/NestTocsQuery";
import { NestSearchTocsByCriteriaQuery } from "../Sources/Query/NestSearchTocsByCreiteriaQuery";

@Controller(`${webroutes.MannagementModuleRoutePrefix}/type-of-cargo`)
export class TocQueryController extends WebController {

    constructor(
        private readonly queryBus: QueryBus
    ) {
        super()
    }

    @Get()
    __invoke(@Req() request, @Res() response) {
        this.response = response;
        Object.entries(request.body).length > 0 ? this.searchByCreiteria(request.body) : this.getAll();
    }

    async searchByCreiteria(
        query: { aggregateId?: string; filters?: []; orderBy?: String; order?: String; offset?: Number, limit?: Number }
    ) {
        return await this.queryBus.execute(new NestSearchTocsByCriteriaQuery(query))
            .then(result => {
                this.resposneWithData(result);
            })
            .catch(err => {
                this.responseWithError(err);
            })
    }

    async getAll() {

        return this.queryBus.execute(new NestTocsQuery())
            .then(result => {
                this.resposneWithData(result);
            }).catch(err => {
                this.responseWithError(err);
            })
    }

}