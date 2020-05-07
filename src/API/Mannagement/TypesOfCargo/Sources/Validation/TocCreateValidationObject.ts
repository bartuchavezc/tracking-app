import { IsNotEmpty } from "class-validator";

export class TocCreateValidationObject {
    
    @IsNotEmpty()
    cargo: String;

    constructor(cargo: String){
        this.cargo = cargo;
    }

}