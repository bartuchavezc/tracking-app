import { Injectable, Inject } from "@nestjs/common";
import { Logger } from "src/APP/Shared/Domain/Logger/Logger";
import { CustomerRepository } from "../../../Domain/CustomerRepository";
import { CustomerNotFound } from "../../../Domain/CustomerNotFound";
import { CustomerSearcherNotWork } from "../../../Domain/CustomerSearcherNotWork";


@Injectable()
export class SearchCustomerByCriteriaService {

    constructor(
        @Inject("CustomerRepositoryProvider") private readonly repository: CustomerRepository,
        @Inject("LoggerProvider") private readonly logger: Logger
    ) { }

    search(criteria: { aggregateId?: string; filters?: []; orderBy?: String; order?: String; offset?: Number, limit?: Number }) {
        return new Promise(async (resolve, reject) => {
            this.repository.getByCriteria(criteria)
                .then(result => {
                    if (criteria.aggregateId && result.length <= 0) {
                        throw new CustomerNotFound()
                    }

                    resolve(result);

                })
                .catch(error => {

                    if (!(error instanceof CustomerNotFound)) {
                        this.logger.error(error);
                        reject(new CustomerSearcherNotWork())
                    }

                    reject(error)
                })
        });
    }

}