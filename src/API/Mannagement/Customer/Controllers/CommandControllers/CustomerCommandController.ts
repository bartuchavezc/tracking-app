import { AppConfig } from "../../../Shared/app.config";

import { validate, ValidationError } from 'class-validator'

import { WebController } from "src/API/Mannagement/Shared/application/nest/WebController";

import { CommandBus } from '@nestjs/cqrs'
import { Controller, Post, Body, Res, Put, Param } from "@nestjs/common";
import { CustomerCreateCommand } from "../../Commands/CustomerCreateCommand";
import { CustomerDTO } from "../../CustomerDTO";
import { response } from "express";
import { CustomerUpdateCommand } from "../../Commands/CustomerUpdateCommand";
@Controller(`${AppConfig.MainRoute}/customer`)
export class CustomerCommandController extends WebController {

    constructor(
        private readonly commandBus: CommandBus
    ) {
        super();
    }

    @Post()
    public async create(@Body() request, @Res() response) {

        const validationErrors = await this.validateRequest(request);

        return (validationErrors).length
            ? this.responseWithValidationErrors('/customer', validationErrors, response)
            : this.createCustomer(request, response);
    }

    @Put(':id')
    public async update(@Param() params,@Body() request, @Res() response) {
        const validationErrors = await this.validateRequest(request);
        
        //insert id in the request object
        request.customerId = params.id;
        
        return (validationErrors).length
            ? this.responseWithValidationErrors('/customer', validationErrors, response)
            : this.updateCustomer(request, response);
    }

    private async validateRequest(@Body() request): Promise<ValidationError[]> {
        return await validate(new CustomerDTO(request))
    }

    private async createCustomer(@Body() request, @Res() response) {

        await this.commandBus.execute(new CustomerCreateCommand(request.name, request.contact))
            .then(() => {
                this.redirectWithMessage('/customers', response, 'creado con exito')
            })
            .catch(error => {
                console.log(error);
                this.redirectWithMessage('/customer', response, `error creating customer`);
            })

    }

    private async updateCustomer(@Body() request, @Res() response) {
        await this.commandBus.execute(new CustomerUpdateCommand(request))
            .then(() => {
                this.redirectWithMessage('/customer', response, 'actualizado con exito');
            })
            .catch(error => {
                console.log(error);
                this.redirectWithMessage('/customer', response, 'error updating customer');
            })
    }

}
