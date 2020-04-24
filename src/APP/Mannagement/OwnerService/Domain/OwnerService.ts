import { Uuid } from "src/APP/Shared/Domain/ValueObjects/Uuid";
import { AggregateRoot } from "@nestjs/cqrs";

export class OwnerService extends AggregateRoot {

    constructor(
        private readonly id: Uuid,
        private readonly serviceName: String
    ){
        super();
    }

    public primitives() : {id: Uuid, name: String} {
        return { id: this.id, name: this.serviceName }
    }
    

    public created(){

    }

    public changed(){

    }

}