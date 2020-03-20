import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs'

import { CustomerCreateCommand } from '../CustomerCreateCommand';
import { Inject } from '@nestjs/common';
import { CustomerCreator } from 'src/app/Mannagement/Customer/Application/Create/CustomerCreator';
import { Customer } from 'src/app/Mannagement/Customer/Domain/Customer';

@CommandHandler(CustomerCreateCommand)
export class CustomerCreateCommandHanlder implements ICommandHandler<CustomerCreateCommand> {

    constructor(
        @Inject('CustomerCreator') private readonly creator: CustomerCreator,
        private readonly publisher: EventPublisher
    ) { }

    async execute(command: CustomerCreateCommand){

        const customer = new Customer(command.id, command.name, command.contact)

        const customerCreator = this.publisher.mergeObjectContext(
            await this.creator.__invoke(customer),
        );

        customerCreator.create(customer);
        customerCreator.commit();
    }

}