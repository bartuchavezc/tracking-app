import { AggregateRoot } from '@nestjs/cqrs'
import { CustomerCreatedEvent } from 'src/API/Mannagement/Customer/Events/CustomerCreatedEvent';
import { Uuid } from 'src/APP/Shared/Domain/ValueObjects/Uuid';

export class Customer extends AggregateRoot {

    creationFailure: { error: Error, message: string };

    deletedAt: Date;

    constructor(
        readonly id: Uuid,
        readonly name: string,
        readonly contact: string,
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


    public create() {
        this.apply(new CustomerCreatedEvent(this));
    }

    public delete(): void {
        this.deletedAt = new Date();
    }

}
