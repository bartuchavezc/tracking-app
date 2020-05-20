import { NestCustomerCreatedEvent } from 'src/API/Mannagement/Customer/Sources/Events/NestCustomerCreatedEvent';
import { Uuid } from 'src/APP/Shared/ValueObjects/Uuid';
import { Aggregate } from 'src/APP/Shared/Domain/Aggregate';

export class Customer extends Aggregate {

    readonly name: String;
    readonly contact: String;

    constructor(
        aggregateId: Uuid,
        { name, contact }: { name?: String, contact?: String },
        readonly _meta?: {
            createdAt?: Date,
            updatedAt?: Date,
            deletedAt?: Date
        }
    ) {
        super(aggregateId);

        if (name) {
            this.name = name;
        }

        if (contact) {
            this.contact = contact;
        }

    }

    public toPrimitives() {
        return {
            aggregateId: this.aggregateId.toString(),
            name: this.name,
            contact: this.contact,
            _meta: this._meta
        }
    }

    public created(customer: Customer) {
        this.apply(new NestCustomerCreatedEvent(customer));
        console.log("aplicando un nuevo evento en customer.create()");
    }

}
