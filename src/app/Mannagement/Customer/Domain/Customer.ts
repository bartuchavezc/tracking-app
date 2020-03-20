import { AggregateRoot } from '@nestjs/cqrs'
import { CustomerCreatedEvent } from 'src/API/Mannagement/Customer/Events/CustomerCreatedEvent';

export class Customer extends AggregateRoot {

    createdAt: Date;
    creationFailure: {error: Error, message: string};

    deletedAt: Date;

    constructor(
        private readonly id: string,
        private readonly name: string,
        private readonly contact: string, 
    ) {
        super();
    }

    getId(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    getContact(){
        return this.contact
    }

    public toPrimitives(){
        return {
            id: this.id,
            name: this.name,
            contact: this.contact
        }   
    }


    public create(customer: Customer){
        this.apply(new CustomerCreatedEvent(customer));
    }

    public delete(): void{
        this.deletedAt = new Date();
    }

}