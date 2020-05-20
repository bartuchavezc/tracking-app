import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common';

import { NestCustomerCreateCommand } from '../NestCustomerCreateCommand';

import { CreationFailedException } from 'src/APP/Shared/Domain/Exception/CreationFailedException';

import { CustomerCreateCommand } from 'src/APP/Mannagement/Customer/Application/Command/CustomerCreateCommand';
import { CustomerCreationService } from 'src/APP/Mannagement/Customer/Application/Services/Create/CustomerCreationService';


@CommandHandler(NestCustomerCreateCommand)
export class NestCustomerCreateCommandHanlder implements ICommandHandler<NestCustomerCreateCommand> {

    constructor(
        @Inject('CustomerCreator') private readonly service: CustomerCreationService,
    ) { }

    async execute(command: NestCustomerCreateCommand) {
        return await this.service.__invoke(command.name, command.contact, "CreatedCustomer")
    }

}
