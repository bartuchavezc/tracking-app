import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NestTocCreateCommand } from "../NestTocCreateCommand";
import { Inject } from "@nestjs/common";
import { TocCreationService } from "src/APP/Mannagement/TypesOfCargo/Application/Services/Create/TocCreationService";
import { TocCreateCommand } from "src/APP/Mannagement/TypesOfCargo/Application/Command/TocCreateCommand";

@CommandHandler(NestTocCreateCommand)
export class TocCreateCommandHanlder implements ICommandHandler<NestTocCreateCommand> {

    constructor(
        @Inject("TocCreationService") private readonly creationService: TocCreationService
    ){}

    async execute(command: TocCreateCommand){
        return await this.creationService.__invoke(command.cargo)
    }

}