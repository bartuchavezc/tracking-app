import { ICommand } from "@nestjs/cqrs";
import { TocCreateCommand } from "src/APP/Mannagement/TypesOfCargo/Application/Command/TocCreateCommand";

export class NestTocCreateCommand extends TocCreateCommand implements ICommand {

    constructor(
        readonly cargo: String
    ){
        super();
    }

}