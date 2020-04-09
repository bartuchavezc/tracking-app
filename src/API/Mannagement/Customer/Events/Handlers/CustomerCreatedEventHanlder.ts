import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import { CustomerCreatedEvent } from "../CustomerCreatedEvent";
//import { Inject } from '@nestjs/common';
@EventsHandler(CustomerCreatedEvent)
export class CustomerCreatedEventHanlder implements IEventHandler<CustomerCreatedEvent> {

    constructor(
        //@Inject('CustomerEventRepository') private repository: CustomerEventRepository
    ){}

    async handle(
        event: CustomerCreatedEvent
    ) {
        console.log(event, 'on event handler');
    }

}