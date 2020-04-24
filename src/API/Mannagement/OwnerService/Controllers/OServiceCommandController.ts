import { Controller, Post, Body } from "@nestjs/common";
import { WebController } from "../../Shared/application/nest/WebController";
import { CommandBus } from "@nestjs/cqrs";
import { NestOServiceCreateCommand } from "../Sources/Command/NestOServiceCrateCommand";

@Controller("/services")
export class OwnerServiceCommandController extends WebController {

    constructor(
        private commandBus: CommandBus
    ){
        super();
    }

    @Post()
    create(@Body() {name}){
        return this.createOService(name);
    }

    async createOService(name){
        return await this.commandBus.execute(new NestOServiceCreateCommand(name));
    }

}