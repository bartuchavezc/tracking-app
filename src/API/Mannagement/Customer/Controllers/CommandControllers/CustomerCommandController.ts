import { WebController } from "src/API/Mannagement/Shared/application/nest/WebController";
import { Controller, Post, Body, Res, Put, Param } from "@nestjs/common";

import { CommandBus } from '@nestjs/cqrs'

import { NestCustomerCreateCommand } from "../../Sources/Command/NestCustomerCreateCommand";
import { NestCustomerUpdateCommand } from "../../Sources/Command/NestCustomerUpdateCommand";

import { CreateCustomerValidationObject } from "../../Sources/Validation/CreateCustomerValidationObject";
import { UpdateCustomerValidationObject } from "../../Sources/Validation/UpdateCustomerValidationObject";
import { webroutes } from "src/API/Mannagement/Shared/application/webroutes";

@Controller(`${webroutes.MannagementModuleRoutePrefix}/customer`)
export class CustomerCommandController extends WebController {

    constructor(
        private readonly commandBus: CommandBus
    ) {
        super();
    }

    @Post()
    public create(@Body() customer: CreateCustomerValidationObject, @Res() response) {
        this.response = response;
        this.createCustomer(customer.name, customer.contact);
    }

    @Put(':id')
    public  update(@Param("id") id: string, @Body() customer: UpdateCustomerValidationObject, @Res() response) {
        this.response = response;
        this.updateCustomer(id, customer);
    }

    private async createCustomer(name: String, contact: String) {
        await this.commandBus.execute(new NestCustomerCreateCommand(name, contact))
            .then(() => {
                this.redirectWithMessage('/customers','creado con exito')
            })
            .catch(error => {
                console.log(error);
                this.redirectWithMessage('/customer', `error creating customer`);
            })
    }

    private async updateCustomer(id: string, @Body() {name, contact}) {

        await this.commandBus.execute(new NestCustomerUpdateCommand(id, { name, contact }))
            .then(() => {
                this.redirectWithMessage('/customer', 'actualizado con exito');
            })
            .catch(error => {
                console.log(error);
                this.redirectWithMessage('/customer', 'error updating customer');
            })
    }


}
