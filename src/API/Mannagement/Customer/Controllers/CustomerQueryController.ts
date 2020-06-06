import { Controller, Get, Param, Req, Res, Inject } from "@nestjs/common";
import { WebController } from "../../Shared/application/nest/WebController";
import { QueryBus } from "@nestjs/cqrs";
import { webroutes } from "../../Shared/application/webroutes";
import { NestByCriteriaCustomerQuery } from "../Sources/Query/NestByCriteriaCustomerQuery";
import { NestAllCustomerQuery } from "../Sources/Query/NestAllCustomerQuery";
import { NestOneCustomerQuery } from "../Sources/Query/NestOneCustomerQuery";
import { ValidationService } from "src/APP/Shared/Validator/Service/ValidationService";
import { ValidationErrorList } from "src/APP/Shared/Validator/Domain/ValidationErrorList";

@Controller(`${webroutes.MannagementModuleRoutePrefix}/customer`)
export class CustomerQueryController extends WebController {

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
        return this.queryBus.execute(new NestAllCustomerQuery())
            .then(result => {
                this.resposneWithData(result)
            })
            .catch(error => {
                this.responseWithError(error)
            })
    }

    private async _getOne(aggregateId: string) {
        return await this.queryBus.execute(new NestOneCustomerQuery(aggregateId))
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
        return await this.queryBus.execute(new NestByCriteriaCustomerQuery(query))
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