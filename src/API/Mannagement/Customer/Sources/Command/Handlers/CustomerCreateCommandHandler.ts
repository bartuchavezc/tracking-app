import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common';

import { NestCustomerCreateCommand } from '../NestCustomerCreateCommand';

import { CreationFailedException } from 'src/APP/Shared/Domain/Exception/CreationFailedException';

import { CustomerCreateCommand } from 'src/APP/Mannagement/Customer/Application/Command/CustomerCreateCommand';
import { CustomerCreationService } from 'src/APP/Mannagement/Customer/Application/Services/Create/CustomerCreationService';


@CommandHandler(NestCustomerCreateCommand)
export class CustomerCreateCommandHanlder implements ICommandHandler<NestCustomerCreateCommand> {

    constructor(
        @Inject('CustomerCreator') private readonly creator: CustomerCreationService,
        private readonly publisher: EventPublisher
    ) { }

    execute(command: CustomerCreateCommand) {
        return new Promise(async (resolve, reject) => {
            await this.creator.__invoke("CreatedCustomer", command.name, command.contact)
            .then(result => {
                resolve();
                const createdCustomer = this.publisher.mergeObjectContext(result)
                
                createdCustomer.created(createdCustomer);
                createdCustomer.commit();
            })
            .catch(error => {reject(new CreationFailedException(error, 'CustomerCommandHandler')) })
        })

    }

}
