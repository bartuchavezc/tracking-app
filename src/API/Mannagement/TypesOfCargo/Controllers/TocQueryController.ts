import { Controller, Get, Req, Param, Res, Inject } from "@nestjs/common";
import { WebController } from "../../Shared/application/nest/WebController";
import { webroutes } from "../../Shared/application/webroutes";
import { QueryBus } from "@nestjs/cqrs";
import { NestTocsQuery } from "../Sources/Query/NestTocsQuery";
import { NestSearchTocsByCriteriaQuery } from "../Sources/Query/NestSearchTocsByCreiteriaQuery";
import { NestSearchOneTypeOfCargoQuery } from "../Sources/Query/NestSearchOneTypeOfCargoQuery";
import { ValidationErrorList } from "src/APP/Shared/Validator/Domain/ValidationErrorList";
import { ValidationService } from "src/APP/Shared/Validator/Service/ValidationService";

@Controller(`${webroutes.MannagementModuleRoutePrefix}/type-of-cargo`)
export class TocQueryController extends WebController {

    constructor(
        @Inject("ValidationService") private readonly validation: ValidationService,
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
    async getOne(@Param("id") aggregateId: string, @Res() response) {
        this.response = response;
        await this.validateRequest(aggregateId)
            .then(result => result.length > 0 ? this.response400(`ValidationErrors: ${JSON.stringify(result)}`) : this._getOne(aggregateId))
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

    private async validateRequest(agrgegateId: string) {
        const constraint = new ValidationErrorList();
        await this.validation.isUuid(agrgegateId).catch(error => constraint.push({ aggregateId: error.message }));
        return constraint;
    }

}