import { Inject } from "@nestjs/common";
import { CustomerRepository } from "../../../Domain/CustomerRepository";
import { Logger } from "src/APP/Shared/Logger/Logger";
import { Customer } from "../../../Domain/Customer";
import { Uuid } from "src/APP/Shared/ValueObjects/Uuid";
import { CustomerCreationFailed } from "../../../Domain/CustomerCreationFailed";

export class CustomerUpdateService {

    constructor(
        @Inject("CustomerRepositoryProvider") private readonly repository: CustomerRepository,
        @Inject("LoggerProvider") private readonly logger: Logger
    ) { }

    __invoke(
        agrgegateId: string,
        { name, contact }: { name?: String, contact?: String },
        event: String
    ) {
        return this.persist(this.create(agrgegateId, { name, contact }), event);
    }

    private create(
        agrgegateId: string,
        nameAndCotnact: { name?: String, contact?: String },
    ) {
        return new Customer(new Uuid(agrgegateId), nameAndCotnact, { updatedAt: new Date() });
    }

    private persist(customer: Customer, event: String) {
        return new Promise(async (resolve, reject) => {
            await this.repository.add(customer, event)
                .then(result => {
                    resolve(customer.toPrimitives());
                })
                .catch(error => {
                    this.logger.error(error);
                    reject(new CustomerCreationFailed())
                })
        });
    }

}