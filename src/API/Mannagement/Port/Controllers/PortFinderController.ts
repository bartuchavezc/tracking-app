import { Controller, Get, Param, Res, Req, Inject } from "@nestjs/common";
import { webroutes } from "../../Shared/application/webroutes";
import { QueryBus } from "@nestjs/cqrs";
import { WebController } from "../../Shared/application/nest/WebController";
import { ValidationErrorList } from "src/APP/Shared/Validator/Domain/ValidationErrorList";
import { ValidationService } from "src/APP/Shared/Validator/Service/ValidationService";
import { PortsNestQuery } from "../Querys/PortsNestQuery";
@Controller(`${webroutes.MannagementModuleRoutePrefix}/port`)
export class PortFinderEndpoint extends WebController {

    constructor(
        @Inject("ValidationService") private readonly validation: ValidationService,
        private queryBus: QueryBus
    ) {
        super()
    }

    @Get()
    async getPort(@Req() request, @Res() response) {
        this.response = response;
        await this.__validate(request.query.address)
            .then(result => {
                result.length > 0
                    ? this.response400(`ValidationErros: ${JSON.stringify(result)}`)
                    : this.__getPort(request.query.address)
            })
    }

    private async __getPort(address: String) {
        await this.queryBus.execute(new PortsNestQuery(address))
            .then(result => {
                this.resposneWithData(result)
            })
            .catch(error => {
                this.response500(new Error("Something Has Ocurred, please try later or contact management"))
            })
    }

    private async __validate(address: String) {
        const constraint = new ValidationErrorList();

        await this.validation.isNotEmpty(address).catch(error => constraint.push({ key: "address", value: address, messages: [error.message] }))
        await this.validation.minLengthMatch(address, 4).catch(error => constraint.push({ key: "address", value: address, messages: [error.message] }))

        return constraint;
    }

}