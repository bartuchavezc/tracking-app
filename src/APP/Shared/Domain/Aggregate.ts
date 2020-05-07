import { AggregateRoot } from "@nestjs/cqrs";
import { Uuid } from "../ValueObjects/Uuid";

export class Aggregate extends AggregateRoot {

    constructor(
        protected readonly aggregateId: Uuid
    ){
        super()
    }

}