import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs'

import { CustomerCreateCommand } from '../CustomerCreateCommand';
import { Inject } from '@nestjs/common';
import { CustomerCreator } from 'src/APP/Mannagement/Customer/Application/Create/CustomerCreator';
import { CreationFailedException } from 'src/APP/Shared/Domain/Exception/CreationFailedException';

@CommandHandler(CustomerCreateCommand)
export class CustomerCreateCommandHanlder implements ICommandHandler<CustomerCreateCommand> {

    constructor(
        @Inject('CustomerCreator') private readonly creator: CustomerCreator,
        private readonly publisher: EventPublisher
    ) { }

    execute(command: CustomerCreateCommand) {
        return new Promise(async (resolve, reject) => {
            await this.creator.__invoke(command.name, command.contact)
            .then(result => {
                resolve();
                const customerCreator = this.publisher.mergeObjectContext(result)
                
                customerCreator.create();
                customerCreator.commit();
            })
            .catch(error => {reject(new CreationFailedException(error, 'CustomerCommandHandler')) })
        })

    }

}
