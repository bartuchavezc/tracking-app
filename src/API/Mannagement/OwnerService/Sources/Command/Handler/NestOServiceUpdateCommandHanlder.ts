import { NestOServiceUpdateCommand } from "../NestOServiceUpdateCommand";
import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { OServiceUpdateService } from "src/APP/Mannagement/OwnerService/Application/Service/Update/OServiceUpdateService";
import { OServiceUpdateCommand } from "src/APP/Mannagement/OwnerService/Application/Command/OServiceUpdateCommand";

@CommandHandler(NestOServiceUpdateCommand)
export class NestOServiceUpdateCommandHandler implements ICommandHandler<NestOServiceUpdateCommand>{

    constructor(
        @Inject("OServiceUpdateService") private readonly updateService: OServiceUpdateService
    ) { }

    async execute(command: OServiceUpdateCommand) {
        return await this.updateService.__writed(command.id, command.name, "ChangedServiceName")
    }

}