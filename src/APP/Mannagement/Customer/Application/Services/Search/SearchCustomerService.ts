import { Injectable, Inject } from "@nestjs/common";
import { CustomerRepository } from "../../../Domain/CustomerRepository";
import { Logger } from "src/APP/Shared/Logger/Logger";
import { CustomerSearcherNotWork } from "../../../Domain/CustomerSearcherNotWork";

@Injectable()
export class SearchCustomersService {

    constructor(
        @Inject("CustomerRepositoryProvider") private readonly repository: CustomerRepository,
        @Inject("LoggerProvider") private readonly logger: Logger
    ) { }

    search() {
        return new Promise(async (resolve, reject) => {
            await this.repository.getAll()
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                this.logger.error(error);
                reject(new CustomerSearcherNotWork())
            })

        })
    }

}