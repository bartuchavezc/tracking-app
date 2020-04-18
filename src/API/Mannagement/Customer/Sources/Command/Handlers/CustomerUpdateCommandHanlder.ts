import { CommandHandler, ICommandHandler, EventBus } from "@nestjs/cqrs";
import { NestCustomerUpdateCommand } from "../NestCustomerUpdateCommand";
import { Inject } from "@nestjs/common";
import { CustomerChangeNameService } from "src/APP/Mannagement/Customer/Application/Services/Update/CustomerChangeNameService";
import { CustomerChangeContactService } from "src/APP/Mannagement/Customer/Application/Services/Update/CustomerChangeContactService";
import { CustomerUpdateCommand } from "src/APP/Mannagement/Customer/Application/Command/CustomerUpdateCommand";
import { NestCustomerChangedNameEvent } from "../../Events/NestCustomerChangedNameEvent";
import { NestCustomerChangedContactEvent } from "../../Events/NestCustomerChangedContactEvent";


@CommandHandler(NestCustomerUpdateCommand)
export class CustomerUpdateCommandHanlder implements ICommandHandler<NestCustomerUpdateCommand>{


    constructor(
        @Inject("CustomerChangeNameService") private readonly changeCustomerNameService: CustomerChangeNameService,
        @Inject("CustomerChangeContactService") private readonly changeCustomerContactService: CustomerChangeContactService,
        private readonly eventBus: EventBus
    ) { }

    execute(command: CustomerUpdateCommand) {
        return new Promise(async (resolve, reject) => {

            if (command.name) {       
                await this.changeCustomerNameService.makeChange(command.id , command.name)
                    .then(result => {
                        this.eventBus.publish(new NestCustomerChangedNameEvent(result.id, result.name));
                    })
                    .catch(err => {
                        reject(err);
                    })
            }

            if (command.contact) {       
                await this.changeCustomerContactService.makeChange(command.id , command.contact)
                    .then(result => {
                        this.eventBus.publish(new NestCustomerChangedContactEvent(result.id, result.name));
                    })
                    .catch(err => {
                        reject(err);
                    })
            }

            resolve();

        });
    }
}