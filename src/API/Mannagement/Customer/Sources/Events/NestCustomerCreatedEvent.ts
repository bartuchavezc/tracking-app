import { IEvent } from '@nestjs/cqrs'
import { Customer } from 'src/APP/Mannagement/Customer/Domain/Customer'
import { CustomerCreatedEvent } from 'src/APP/Mannagement/Customer/Application/Event/CustomerCreatedEvent';

export class NestCustomerCreatedEvent extends CustomerCreatedEvent implements IEvent {

    constructor(customer: Customer) {
        super();
        this.customer = customer;
    }

}