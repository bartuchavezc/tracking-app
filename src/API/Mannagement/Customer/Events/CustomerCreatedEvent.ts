import { IEvent } from '@nestjs/cqrs'
import { Customer } from 'src/app/Mannagement/Customer/Domain/Customer'

export class CustomerCreatedEvent implements IEvent {

    constructor(
        readonly _customer: Customer
    ) { }

    get customer(): Customer{
        return this._customer;
    }

}