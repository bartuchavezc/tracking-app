import { AppConfig } from "../../Shared/app.config";

import { WebController } from 'src/API/Mannagement/Shared/infraestructure/nest/WebController'

import { validate, ValidationError } from 'class-validator'

import { CommandBus } from '@nestjs/cqrs'
import { Controller, Post, Body, Res } from "@nestjs/common";
import { CustomerCreateCommand } from "../Commands/CustomerCreateCommand";
import { CustomerDTO } from "../CustomerDTO";
@Controller(`${AppConfig.MainRoute}/customer`)
export class CustomerCommandController extends WebController {

    constructor(
        private readonly commandBus: CommandBus
    ) {
        super();
    }

    @Post()
    public async __invoke(@Body() request, @Res() response) {

        const validationErrors = await this.validateRequest(request);

        return (validationErrors).length
            ? this.responseWithValidationErrors('/customer', validationErrors, response)
            : this.createCustomer(request, response);
    }

    private async validateRequest(@Body() request): Promise<ValidationError[]> {
        return await validate(new CustomerDTO(request))
    }

    private createCustomer(@Body() request, @Res() response){
        
        this.commandBus.execute(new CustomerCreateCommand(request.id, request.name, request.contact) );

        return this.redirectWithMessage('/customers', response, 'creation request is on the way, please wait for confirmation notification')
    
    }



}
