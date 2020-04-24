import { IsNotEmpty } from "class-validator";
import { OServiceDTO } from "src/APP/Mannagement/OwnerService/Application/OServiceDTO";

export class OServiceValidationObject extends OServiceDTO {
    
    @IsNotEmpty()
    name: String;

}