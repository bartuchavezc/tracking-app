import { Controller, Get, Param, Req, Res, Inject } from "@nestjs/common";
import { WebController } from "../../Shared/application/nest/WebController";
import { QueryBus } from "@nestjs/cqrs";
import { NestOServiceAllQuery } from "../Sources/Query/NestOServicesAllQuery";
import { NestOServiceCriteriaQuery } from "../Sources/Query/NestOServiceCriteriaQuery";
import { webroutes } from "../../Shared/application/webroutes";
import { NestOneOServiceQuery } from "../Sources/Query/NestOneOServiceQuery";
import { ValidationErrorList } from "src/APP/Shared/Validator/Domain/ValidationErrorList";
import { ValidationService } from "src/APP/Shared/Validator/Service/ValidationService";

@Controller(`${webroutes.MannagementModuleRoutePrefix}/owner-service`)
export class OServiceQueryController extends WebController {

    constructor(
        @Inject("ValidationService") private readonly validation: ValidationService,
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
    async getOne(@Param("id") aggregateId: string, @Res() response) {
        this.response = response;
        await this.validateRequest(aggregateId)
            .then(result => result.length > 0 ? this.response400(`ValidationErrors: ${JSON.stringify(result)}`) : this._getOne(aggregateId))
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
            .catch(error => {
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

    private async validateRequest(agrgegateId: string) {
        const constraint = new ValidationErrorList();
        await this.validation.isUuid(agrgegateId).catch(error => constraint.push({ aggregateId: error.message }));
        return constraint;
    }

}