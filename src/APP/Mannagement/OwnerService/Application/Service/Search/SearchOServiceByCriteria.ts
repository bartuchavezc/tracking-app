import { Injectable, Inject } from "@nestjs/common";
import { OwnerServicerepository } from "../../../Domain/OwnerServiceRepository";
import { Logger } from "src/APP/Shared/Domain/Logger/Logger";
import { NotFoundOwnerService } from "../../../Domain/NotFoundOwnerService";

@Injectable()
export class SearchOServiceByCriteria {

    constructor(
        @Inject("OwnerServiceRepository") private readonly repository: OwnerServicerepository,
        @Inject("LoggerProvider") private readonly logger: Logger
    ) { }

    search(criteria: { aggregateId?: string; filters?: []; orderBy?: String; order?: String; offset?: Number, limit?: Number }) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.repository.getByCriteria(criteria);

                if(criteria.aggregateId && result.length > 0) {
                    throw new NotFoundOwnerService();
                }

                resolve(result);

            } catch (error) {
                if(!(error instanceof NotFoundOwnerService)){
                    this.logger.error(error)
                    reject(new Error("Cannot get data right now, please try latter"))
                }

                reject(error)
            }
        })
    }

}