import { Controller, Post, Body, Put, Param, Res, Inject } from "@nestjs/common";
import { WebController } from "../../Shared/application/nest/WebController";
import { CommandBus } from "@nestjs/cqrs";
import { webroutes } from "../../Shared/application/webroutes";
import { CreateCustomerValidationObject } from "../Sources/Validation/CreateCustomerValidationObject";
import { NestCustomerCreateCommand } from "../Sources/Command/NestCustomerCreateCommand";
import { NestCustomerUpdateCommand } from "../Sources/Command/NestCustomerUpdateCommand";
import { ValidationService } from "src/APP/Shared/Validator/Service/ValidationService";

@Controller(`${webroutes.MannagementModuleRoutePrefix}/customer`)
export class CustomerCommandController extends WebController {

    constructor(
        @Inject("ValidationService") private readonly validation: ValidationService,
        private commandBus: CommandBus
    ) {
        super();
    }

    @Post()
    async create(@Body() customer: CreateCustomerValidationObject, @Res() response) {
        this.response = response;
        await this._create(customer.name, customer.contact)
    }

    @Put(":id")
    async update(@Param("id") aggregateId: string, @Body() { name, contact }: { name?: String, contact?: String }, @Res() response) {
        this.response = response;
        await this.validateRequest({ aggregateId, contact })
            .then(result => {
                console.log(result.length)
                result.length > 0
                    ? this.response400(new Error(JSON.stringify(result)))
                    : this._update(aggregateId, { name, contact })
            })
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

    private async validateRequest({ aggregateId, name, contact }: { aggregateId?: string, name?: String, contact?: String }) {
        const constraint = new Array();
        if (aggregateId) await this.validation.isUuid(aggregateId).catch(error => constraint.push({ aggregateId: error.message }));
        if (contact) await this.validation.isEmail(contact).catch(error => constraint.push({ contact: error.message }));
        
        return constraint
    }

}