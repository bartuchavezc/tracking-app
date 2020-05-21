import { Injectable, Inject } from "@nestjs/common";
import { CustomerRepository } from "../../../Domain/CustomerRepository";
import { Logger } from "src/APP/Shared/Domain/Logger/Logger";
import { CustomerSearcherNotWork } from "../../../Domain/CustomerSearcherNotWork";
import { CustomerNotFound } from "../../../Domain/CustomerNotFound";

@Injectable()
export class SearchOneCustomer {

    constructor(
        @Inject("CustomerRepositoryProvider") private readonly repository: CustomerRepository,
        @Inject("LoggerProvider") private readonly logger: Logger
    ) { }

    search(aggregateId: string) {
        return new Promise(async (resolve, reject) => {
            await this.repository.getById(aggregateId)
                .then(result => {
                    if (result.length <= 0) {
                        throw new CustomerNotFound(`customer with id: ${aggregateId}`);
                    }
                    resolve(result);
                })
                .catch(error => {
                    if (!(error instanceof CustomerNotFound)) {
                        this.logger.error(error);
                        reject(new CustomerSearcherNotWork())
                    }
                    reject(error);
                })

        })
    }

}