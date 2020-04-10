import { IsNotEmpty, IsUUID, IsEmail } from "class-validator";

export class CustomerUpdateDTO {

    @IsNotEmpty()
    @IsUUID()
    public readonly id: String;

    constructor( id: String){
        this.id = id;
    }


}