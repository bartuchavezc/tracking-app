import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NestTocUpdateCommand } from "../NestTocUpdateCommand";
import { Inject } from "@nestjs/common";
import { TocUpdateService } from "src/APP/Mannagement/TypesOfCargo/Application/Services/Update/TocUpdateService";
import { TocUpdateCommand } from "src/APP/Mannagement/TypesOfCargo/Application/Command/TocUpdateCommand";

@CommandHandler(NestTocUpdateCommand)
export class TocUpdateCommandHanlder implements ICommandHandler<NestTocUpdateCommand> {

    constructor(
        @Inject("TocUpdateService") private readonly updateService: TocUpdateService
    ){}

    async execute(command: TocUpdateCommand){
        return await this.updateService.__invoke(command.aggregateId, command.cargo)
    }

}