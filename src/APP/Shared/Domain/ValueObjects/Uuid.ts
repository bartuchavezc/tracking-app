import { IsUUID, validate, ValidationError } from "class-validator";
import { DoesNotUuidException } from "../Exception/DoesNotUuidException";

export class Uuid {

    @IsUUID("4")
    private value;
    
    constructor(value: String){

        this.value = value;

        this.ensureIsValidUuid().then(validationErrors => {
            if(validationErrors.length){
                validationErrors.map(error => {throw new DoesNotUuidException(error)})
            }
        }).catch(error => {console.log(error)})

    }

    private async  ensureIsValidUuid(): Promise<ValidationError[]>{
        return await validate(this);
    }

    public equals(otherUuid: string){
        return this.value === otherUuid;
    }

    public toString(): string{
        return this.value;
    }

}
