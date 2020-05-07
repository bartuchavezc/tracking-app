import { IsNotEmpty } from "class-validator";

export class TocUpdateValidationObject {
    
    @IsNotEmpty()
    cargo: String;

    constructor(cargo: String){
        this.cargo = cargo;
    }

}