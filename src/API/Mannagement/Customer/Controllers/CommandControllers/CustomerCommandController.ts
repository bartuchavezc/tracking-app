import { AppConfig } from "../../../Shared/app.config";

import { WebController } from "src/API/Mannagement/Shared/application/nest/WebController";
import { Controller, Post, Body, Res, Put, Param } from "@nestjs/common";

import { CommandBus } from '@nestjs/cqrs'

import { NestCustomerCreateCommand } from "../../Sources/Command/NestCustomerCreateCommand";
import { NestCustomerUpdateCommand } from "../../Sources/Command/NestCustomerUpdateCommand";

import { CreateCustomerValidationObject } from "../../Sources/Validation/CreateCustomerValidationObject";
import { UpdateCustomerValidationObject } from "../../Sources/Validation/UpdateCustomerValidationObject";

@Controller(`/customer`)
export class CustomerCommandController extends WebController {

    constructor(
        private readonly commandBus: CommandBus
    ) {
        super();
    }

    @Post()
    public create(@Body() customer: CreateCustomerValidationObject, @Res() response) {
        this.createCustomer(customer.name, customer.contact, response);
    }

    @Put(':id')
    public  update(@Param("id") id: string, @Body() customer: UpdateCustomerValidationObject, @Res() response) {
        this.updateCustomer(id, customer, response);
    }

    private async createCustomer(name: String, contact: String, @Res() response) {
        await this.commandBus.execute(new NestCustomerCreateCommand(name, contact))
            .then(() => {
                this.redirectWithMessage('/customers', response, 'creado con exito')
            })
            .catch(error => {
                console.log(error);
                this.redirectWithMessage('/customer', response, `error creating customer`);
            })
    }

    private async updateCustomer(id: string, @Body() {name, contact}, @Res() response) {

        await this.commandBus.execute(new NestCustomerUpdateCommand(id, { name, contact }))
            .then(() => {
                this.redirectWithMessage('/customer', response, 'actualizado con exito');
            })
            .catch(error => {
                console.log(error);
                this.redirectWithMessage('/customer', response, 'error updating customer');
            })
    }


}
