import { AggregateRoot } from "@nestjs/cqrs";
import { Uuid } from "src/APP/Shared/ValueObjects/Uuid";
import { Aggregate } from "src/APP/Shared/Domain/Aggregate";

export class TypeOfCargo extends Aggregate {

    constructor(
        aggregateId: Uuid,
        readonly cargo: String,
        readonly _meta?: {
            createdAt?: Date,
            updatedAt?: Date,
            deletedAt?: Date
        }
    ) {
        super(aggregateId);
    }

    public created() {
        console.log(this);
    }

    public toPrimitives() {
        return {
            aggregateId: this.aggregateId.toString(),
            cargo: this.cargo,
            _meta: this._meta
        }
    }

}