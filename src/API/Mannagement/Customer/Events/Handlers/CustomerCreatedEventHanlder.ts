import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import { CustomerCreatedEvent } from "../CustomerCreatedEvent";

@EventsHandler(CustomerCreatedEvent)
export class CustomerCreatedEventHanlder implements IEventHandler<CustomerCreatedEvent> {

    async handle(event: CustomerCreatedEvent){
        console.log(event.customer, 'on command handler');
    }    

}