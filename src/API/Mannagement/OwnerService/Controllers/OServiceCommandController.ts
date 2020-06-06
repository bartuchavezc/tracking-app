import { Controller, Post, Body, Put, Param, Res, Inject } from "@nestjs/common";
import { WebController } from "../../Shared/application/nest/WebController";
import { CommandBus } from "@nestjs/cqrs";
import { NestOServiceCreateCommand } from "../Sources/Command/NestOServiceCrateCommand";
import { NestOServiceUpdateCommand } from "../Sources/Command/NestOServiceUpdateCommand";
import { webroutes } from "../../Shared/application/webroutes";
import { ValidationErrorList } from "src/APP/Shared/Validator/Domain/ValidationErrorList";
import { ValidationService } from "src/APP/Shared/Validator/Service/ValidationService";

@Controller(`${webroutes.MannagementModuleRoutePrefix}/owner-service`)
export class OwnerServiceCommandController extends WebController {

    constructor(
        @Inject("ValidationService") private readonly validation: ValidationService,
        private commandBus: CommandBus
    ) {
        super();
    }

    @Post()
    async create(@Body() { serviceName }: { serviceName: String }, @Res() response) {
        this.response = response;
        await this.validateRequest({ serviceName })
            .then(result => result.length > 0 ? this.response400(`ValidationErros: ${JSON.stringify(result)}`) : this._create(serviceName))
    }

    @Put(":id")
    async update(@Param("id") aggregateId: string, serviceName: String, @Res() response) {
        this.response = response;
        await this.validateRequest({ aggregateId, serviceName })
            .then(result => result.length > 0 ? this.response400(`ValidationErros: ${JSON.stringify(result)}`) : this._update(aggregateId, serviceName))

    }

    private async _create(serviceName) {
        await this.commandBus.execute(new NestOServiceCreateCommand(serviceName))
            .then(result => {
                this.resposneWithData(result);
            })
            .catch(error => {
                this.responseWithError(error)
            })
    }

    private async _update(aggregateId: string, serviceName: String) {
        await this.commandBus.execute(new NestOServiceUpdateCommand(aggregateId, serviceName))
            .then(result => {
                this.resposneWithData(result);
            })
            .catch(error => {
                this.responseWithError(error)
            })
    }

    private async validateRequest({ aggregateId, serviceName }: { aggregateId?: string, serviceName: String }) {
        const constraint = new ValidationErrorList();

        if (aggregateId) await this.validation.isUuid(aggregateId).catch(error => constraint.push({ aggregateId: error.message }));

        if (serviceName != undefined) await this.validation.minLengthMatch(serviceName, 4).catch(error => constraint.push({ serviceName: error.message }))
        await this.validation.isNotEmpty(serviceName).catch(error => constraint.push({ serviceName: error.message }))

        return constraint
    }

}