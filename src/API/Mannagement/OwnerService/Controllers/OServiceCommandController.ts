import { Controller, Post, Body, Put, Param } from "@nestjs/common";
import { WebController } from "../../Shared/application/nest/WebController";
import { CommandBus } from "@nestjs/cqrs";
import { NestOServiceCreateCommand } from "../Sources/Command/NestOServiceCrateCommand";
import { OServiceValidationObject } from "../Sources/Validation/OServiceValidationObject";
import { NestOServiceCreateCommandHandler } from "../Sources/Command/Handler/NestOServiceCreateCommandHandler";
import { NestOServiceUpdateCommand } from "../Sources/Command/NestOServiceUpdateCommand";
import { Uuid } from "src/APP/Shared/Domain/ValueObjects/Uuid";

@Controller("/services")
export class OwnerServiceCommandController extends WebController {

    constructor(
        private commandBus: CommandBus
    ){
        super();
    }

    @Post()
    create(@Body() OService: OServiceValidationObject){
        return this.createOService(OService.name);
    }

    @Put(":id")
    update(@Param("id") id: string ,@Body() OService: OServiceValidationObject){
        return this.updateOService(id, OService.name);
    }

    async createOService(name){
        return await this.commandBus.execute(new NestOServiceCreateCommand(name));
    }

    async updateOService(id: string, name: String){
        return await this.commandBus.execute(new NestOServiceUpdateCommand(new Uuid(id), name))
    }

}