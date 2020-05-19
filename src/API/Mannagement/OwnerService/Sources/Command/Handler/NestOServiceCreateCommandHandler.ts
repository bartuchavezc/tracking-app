import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { OServiceCreateCommand } from "src/APP/Mannagement/OwnerService/Application/Command/OServiceCrateCommand";
import { Inject } from "@nestjs/common";
import { OServiceCrationService } from "src/APP/Mannagement/OwnerService/Application/Service/Create/OServiceCreationService";
import { NestOServiceCreateCommand } from "../NestOServiceCrateCommand";

@CommandHandler(NestOServiceCreateCommand)
export class NestOServiceCreateCommandHandler implements ICommandHandler<NestOServiceCreateCommand>{

    constructor(
        @Inject("OServiceCreationService") private readonly creationService: OServiceCrationService
    ){}

    async execute(command: OServiceCreateCommand){
        return await this.creationService.__invoke(command.name, "CreatedOwnerService");
    }

}