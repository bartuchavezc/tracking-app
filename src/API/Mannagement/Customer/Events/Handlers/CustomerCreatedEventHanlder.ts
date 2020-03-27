import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import { CustomerCreatedEvent } from "../CustomerCreatedEvent";
import { Inject } from '@nestjs/common';
import { CustomerEventRepository } from 'src/app/Mannagement/Customer/Domain/Repository/EventStore/CustomerEventRepository';

@EventsHandler(CustomerCreatedEvent)
export class CustomerCreatedEventHanlder implements IEventHandler<CustomerCreatedEvent> {

    constructor(
        @Inject('CustomerEventRepository') private repository: CustomerEventRepository
    ){}

    async handle(
        event: CustomerCreatedEvent
    ) {
        console.log(event.customer);

        const {id, name, contact} = event.customer.toPrimitives()
        const {createdAt } = event.customer 
        
        const status = 'usable'

        const payload = {
            customerName: name,
            customerContact: contact
        }

        const meta = {
            title: 'Nuevo customer creado',
            createdAt
        }

        await this.repository.create({id, status, payload, meta })
    }

}