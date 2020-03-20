import { AppConfig } from "../../Shared/app.config";

import { CommandBus } from '@nestjs/cqrs'
import { Controller, Post, Body } from "@nestjs/common";
import { CustomerCreateCommand } from "../Commands/CustomerCreateCommand";

@Controller(`${AppConfig.MainRoute}/customer`)
export class CustomerCommandController {

    constructor(
        private readonly commandBus: CommandBus
    ) { }

    @Post()
    public async create(@Body() request) {
        await this.commandBus.execute(
            new CustomerCreateCommand(
                request.id,
                request.name,
                request.contact
            )
        );
    }

}
