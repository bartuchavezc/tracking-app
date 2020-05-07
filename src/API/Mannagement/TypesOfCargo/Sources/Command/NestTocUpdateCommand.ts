import { ICommand } from "@nestjs/cqrs";
import { TocUpdateCommand } from "src/APP/Mannagement/TypesOfCargo/Application/Command/TocUpdateCommand";

export class NestTocUpdateCommand extends TocUpdateCommand implements ICommand {

    constructor(
        readonly aggregateId: string,
        readonly cargo: String
    ){
        super();
    }

}