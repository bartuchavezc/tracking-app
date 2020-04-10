import { CommandHandler, ICommandHandler, EventPublisher, EventBus } from "@nestjs/cqrs";
import { CustomerUpdateCommand } from "../CustomerUpdateCommand";
import { Inject } from "@nestjs/common";
import { CustomerChangeNameService } from "src/APP/Mannagement/Customer/Application/Update/CustomerChangeNameService";
import { CustomerChangeContactService } from "src/APP/Mannagement/Customer/Application/Update/CustomerChangeContactService";
import { CustomerChangedNameEvent } from "../../Events/CustomerChangedNameEvent";
import { CustomerChangedContactEvent } from "../../Events/CustomerChangedContactEvent";

@CommandHandler(CustomerUpdateCommand)
export class CustomerChangeNameCommandHanlder implements ICommandHandler<CustomerUpdateCommand>{

    constructor(
        @Inject("CustomerChangeNameService") private readonly changeCustomerNameService: CustomerChangeNameService,
        @Inject("CustomerChangeContactService") private readonly changeCustomerContactService: CustomerChangeContactService,
        private readonly eventBus: EventBus
    ) { }

    execute(command: CustomerUpdateCommand) {
        return new Promise(async (resolve, reject) => {

            let servicesResult: {
                onName: { check: Boolean, success: Boolean },
                onContact: { check: Boolean, success: Boolean },
            }

            if (command.name) {
                servicesResult.onName.check = true;

                await this.changeCustomerNameService.makeChange(command.id, command.name)
                    .then(result => {
                        this.eventBus.publish(new CustomerChangedNameEvent(result.id, result.name));
                        servicesResult.onName.success = true;
                    })
                    .catch(err => {
                        reject(err);
                    })
            }

            if (command.contact) {
                servicesResult.onContact.check = true;

                await this.changeCustomerContactService.makeChange(command.id, command.contact)
                    .then(result => {
                        this.eventBus.publish(new CustomerChangedContactEvent(command.id, command.contact));
                        servicesResult.onContact.success = true;
                    })
                    .catch(err => {
                        reject(err);
                    })
            }

            resolve();

        });
    }
}