import { CustomerChangedContactEvent } from "src/APP/Mannagement/Customer/Application/Event/CustomerChangedContactEvent";
import { IEvent } from "@nestjs/cqrs";

export class NestCustomerChangedContactEvent extends CustomerChangedContactEvent implements IEvent {

    constructor (id: string, contact: String){
        super();

        this.id = id;
        this.contact = contact;
    }

}