import { Controller, Post, Body, Put, Param, Res, Inject } from "@nestjs/common";
import { WebController } from "../../Shared/application/nest/WebController";
import { CommandBus } from "@nestjs/cqrs";
import { webroutes } from "../../Shared/application/webroutes";
import { CreateCustomerValidationObject } from "../Sources/Validation/CreateCustomerValidationObject";
import { NestCustomerCreateCommand } from "../Sources/Command/NestCustomerCreateCommand";
import { NestCustomerUpdateCommand } from "../Sources/Command/NestCustomerUpdateCommand";
import { UpdateCustomerValidationObject } from "../Sources/Validation/UpdateCustomerValidationObject";
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
    create(@Body() customer: CreateCustomerValidationObject, @Res() response) {
        this.response = response;
        this._create(customer.name, customer.contact);
    }

    @Put(":id")
    update(@Param("id") aggregateId: string, @Body() { name, contact }: { name?: String, contact?: String }, @Res() response) {
        this.response = response;
        this.validation.isEmail(contact)
            .then(() => this._update(aggregateId, { name, contact }))
            .catch(error => this.response400(error))
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

}