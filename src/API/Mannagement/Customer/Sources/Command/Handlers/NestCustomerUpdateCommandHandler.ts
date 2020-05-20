import { CommandHandler, ICommandHandler, EventBus } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { CustomerUpdateService } from "src/APP/Mannagement/Customer/Application/Services/Update/CustomerUpdateService";
import { NestCustomerUpdateCommand } from "../NestCustomerUpdateCommand";
import { CustomerUpdateCommand } from "src/APP/Mannagement/Customer/Application/Command/CustomerUpdateCommand";


@CommandHandler(NestCustomerUpdateCommand)
export class NestCustomerUpdateCommandHanlder implements ICommandHandler<NestCustomerUpdateCommand>{


    constructor(
        @Inject("CustomerUpdateService") private readonly service: CustomerUpdateService
    ) { }

    async execute(command: CustomerUpdateCommand) {
        return await this.service.__invoke(command.aggregateId, { name: command.name, contact: command.contact }, "CustomerChangedName")
    }
}