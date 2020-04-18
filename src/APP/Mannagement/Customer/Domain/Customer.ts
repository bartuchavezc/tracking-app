import { AggregateRoot } from '@nestjs/cqrs'
import { NestCustomerCreatedEvent } from 'src/API/Mannagement/Customer/Sources/Events/NestCustomerCreatedEvent';
import { Uuid } from 'src/APP/Shared/Domain/ValueObjects/Uuid';
import { CustomerEvent } from '../Infraestructure/EventStore/CustomerEvent';
import { CustomerSnapShot } from '../Infraestructure/EventStore/CustomerSnapshoot';

export class Customer extends AggregateRoot {

    creationFailure: { error: Error, message: string };

    private deletedAt: Date;

    constructor(
        readonly id: Uuid,
        readonly name: String,
        readonly contact: String,
        readonly createdAt: Date
    ) {
        super();
    }

    public toPrimitives() {
        return {
            id: this.id.toString(),
            name: this.name,
            contact: this.contact
        }
    }

    public created(customer: Customer) {
        this.apply(new NestCustomerCreatedEvent(customer));
        console.log("aplicando un nuevo evento en customer.create()");
    }

    getSnapshot(eventsList: CustomerEvent[], prevSnapshot: CustomerSnapShot){

    }

    public delete(): void {
        this.deletedAt = new Date();
    }

}
