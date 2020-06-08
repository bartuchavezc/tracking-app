import { Controller, Post, Body, Put, Param, Res, Inject, Get, Req } from "@nestjs/common";
import { WebController } from "../../Shared/application/nest/WebController";
import { CommandBus } from "@nestjs/cqrs";
import { webroutes } from "../../Shared/application/webroutes";
import { NestCustomerCreateCommand } from "../Sources/Command/NestCustomerCreateCommand";
import { NestCustomerUpdateCommand } from "../Sources/Command/NestCustomerUpdateCommand";
import { ValidationService } from "src/APP/Shared/Validator/Service/ValidationService";
import { ValidationErrorList } from "src/APP/Shared/Validator/Domain/ValidationErrorList";
import { MapQuestGeocodePortAddress } from "src/APP/Mannagement/Port/Infraestructure/GeocodingAPI/MapQuest/MapQuestGeocodePortAddress";

@Controller(`${webroutes.MannagementModuleRoutePrefix}/customer`)
export class CustomerCommandController extends WebController {

    constructor(
        @Inject("ValidationService") private readonly validation: ValidationService,
        private commandBus: CommandBus
    ) {
        super();
    }

    @Post()
    async create(@Body() { name, contact }: { name: String, contact: String }, @Res() response) {
        this.response = response;
        await this.validatePostRequest(name, contact)
            .then(result => result.length > 0 ? this.response400(`ValidationErros: ${JSON.stringify(result)}`) : this._create(name, contact))
    }

    @Put(":id")
    async update(@Param("id") aggregateId: string, @Body() { name, contact }: { name?: String, contact?: String }, @Res() response) {
        this.response = response;
        await this.validatePutRequest({ aggregateId, name, contact })
            .then(result => result.length > 0 ? this.response400(`ValidationErros: ${JSON.stringify(result)}`) : this._update(aggregateId, { name, contact }))
    }

    private async _create(name: String, contact: String) {
        await this.commandBus.execute(new NestCustomerCreateCommand(name, contact))
            .then(result => {
                this.resposneWithData(result);
            })
            .catch(error => {
                this.responseWithError(error)
            })
    }

    private async _update(aggregateId: string, { name, contact }: { name?: String, contact?: String }) {
        await this.commandBus.execute(new NestCustomerUpdateCommand(aggregateId, { name, contact }))
            .then(result => {
                this.resposneWithData(result);
            })
            .catch(error => {
                this.responseWithError(error)
            })
    }

    private async validatePutRequest({ aggregateId, name, contact }: { aggregateId?: string, name?: String, contact?: String }) {
        const constraint = new ValidationErrorList();

        if (aggregateId) await this.validation.isUuid(aggregateId).catch(error => constraint.push({ aggregateId: error.message }));

        if (contact) await this.validation.isEmail(contact).catch(error => constraint.push({ contact: error.message }));

        if (name) {
            await this.validation.minLengthMatch(name, 4).catch(error => constraint.push({ name: error.message }))
            await this.validation.isNotEmpty(name).catch(error => constraint.push({ name: error.message }))
        }

        return constraint
    }

    private async validatePostRequest(name: String, contact: String) {
        const constraint = new ValidationErrorList();

        await this.validation.isEmail(contact).catch(error => constraint.push({ contact: error.message }));

        await this.validation.minLengthMatch(name, 4).catch(error => constraint.push({ name: error.message }))
        await this.validation.isNotEmpty(name).catch(error => constraint.push({ name: error.message }))


        return constraint
    }

}