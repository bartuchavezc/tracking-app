import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import { CustomerCreatedEvent } from "../CustomerCreatedEvent";
import { Inject } from '@nestjs/common';
import { CustomerEventRepository } from 'src/APP/Mannagement/Customer/Domain/Repository/EventStore/CustomerEventRepository';

@EventsHandler(CustomerCreatedEvent)
export class CustomerCreatedEventHanlder implements IEventHandler<CustomerCreatedEvent> {

    constructor(
        //@Inject('CustomerEventRepository') private repository: CustomerEventRepository
    ){}

    async handle(
        event: CustomerCreatedEvent
    ) {
        console.log(event, 'on event handler');

        const {id, name, contact} = event.customer.toPrimitives()

        console.log(`customer: ${id}, ${name}, ${contact}`);

    }

}