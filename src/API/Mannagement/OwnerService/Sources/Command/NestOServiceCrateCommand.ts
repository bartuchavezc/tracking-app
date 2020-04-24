import { ICommand } from "@nestjs/cqrs";
import { OServiceCreateCommand } from "src/APP/Mannagement/OwnerService/Application/Command/OServiceCrateCommand";

export class NestOServiceCreateCommand extends OServiceCreateCommand implements ICommand{
    constructor(
        readonly name: String
    ){
        super();
    }

}