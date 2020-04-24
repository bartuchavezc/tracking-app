import { NestOServiceUpdateCommand } from "../NestOServiceUpdateCommand";
import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { OServiceUpdateService } from "src/APP/Mannagement/OwnerService/Application/Service/Update/OServiceUpdateService";
import { OServiceUpdateCommand } from "src/APP/Mannagement/OwnerService/Application/Command/OServiceUpdateCommand";

@CommandHandler(NestOServiceUpdateCommand)
export class NestOServiceCommandHandler implements ICommandHandler<NestOServiceUpdateCommand>{
    
    constructor(
        @Inject("OServiceUpdateService") private readonly updateService: OServiceUpdateService
    ){}

    async execute(command: OServiceUpdateCommand){
        await this.updateService.write(command.id, command.name)
    }

}