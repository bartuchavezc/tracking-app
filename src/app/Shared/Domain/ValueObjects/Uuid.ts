import { IsUUID, validate } from "class-validator";
import { DoesNotUuidException } from "../DoesNotUuidException";

export class Uuid {

    private readonly value: string;

    @IsUUID("4")
    private middleValidationPoint: string;

    constructor(value: string){

        this.middleValidationPoint = value;

        this.ensureIsValidUuid()

        this.value = value;
    }

    private ensureIsValidUuid(){
        if(validate(this.middleValidationPoint)) throw new DoesNotUuidException();
    }

    public equals(otherUuid: string){
        return this.value === otherUuid;
    }

    public toString(): string{
        return this.value;
    }

}
