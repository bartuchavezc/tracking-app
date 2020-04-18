import { IEvent } from "@nestjs/cqrs";
import { CustomerChangedNameEvent } from "src/APP/Mannagement/Customer/Application/Event/CustomerChangedNameEvent";

export class NestCustomerChangedNameEvent extends CustomerChangedNameEvent implements IEvent{

    constructor(id: string, name: String){
        super();
        
        this.id = id;
        this.name = name;
    }

}