import { AppConfig } from "../../../Shared/app.config";

import { validate, ValidationError } from 'class-validator'

import { WebController } from "src/API/Mannagement/Shared/application/nest/WebController";
import { Controller, Post, Body, Res, Put, Param } from "@nestjs/common";

import { CommandBus } from '@nestjs/cqrs'

import { CustomerCreateCommand } from "../../Commands/CustomerCreateCommand";
import { CustomerUpdateCommand } from "../../Commands/CustomerUpdateCommand";

import { CustomerPostDTO } from "../../DTO/CustomerPostDTO";
import { CustomerUpdateDTO } from "../../DTO/CustomerUpdateDTO";

@Controller(`${AppConfig.MainRoute}/customer`)
export class CustomerCommandController extends WebController {

    constructor(
        private readonly commandBus: CommandBus
    ) {
        super();
    }

    @Post()
    public async create(@Body() request, @Res() response) {

        const validationErrors = await this.validatePostRequest(request);

        return (validationErrors).length
            ? this.responseWithValidationErrors('/customer', validationErrors, response)
            : this.createCustomer(request, response);
    }

    @Put(':id')
    public async update(@Param("id") id: String, @Body() request, @Res() response) {
        const validationErrors = await this.validatePutRequest(id, request);
        
        return (validationErrors).length
            ? this.responseWithValidationErrors('/customer', validationErrors, response)
            : this.updateCustomer(id, request, response);
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

    private async updateCustomer(id: String, @Body() {name, contact}, @Res() response) {

        await this.commandBus.execute(new CustomerUpdateCommand(id, { name, contact }))
            .then(() => {
                this.redirectWithMessage('/customer', response, 'actualizado con exito');
            })
            .catch(error => {
                console.log(error);
                this.redirectWithMessage('/customer', response, 'error updating customer');
            })
    }


    private async validatePostRequest(@Body() request): Promise<ValidationError[]> {
        return await validate(new CustomerPostDTO(request))
    }

    private async validatePutRequest(id, @Body() request){
        return await validate(new CustomerUpdateDTO(id));
    }

}
