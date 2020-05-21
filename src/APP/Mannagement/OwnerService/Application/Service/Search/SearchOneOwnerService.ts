import { Injectable, Inject } from "@nestjs/common";
import { OwnerServicerepository } from "../../../Domain/OwnerServiceRepository";
import { Logger } from "src/APP/Shared/Domain/Logger/Logger";
import { NotFoundOwnerService } from "../../../Domain/NotFoundOwnerService";

@Injectable()
export class SearchOneOwnerService {

    constructor(
        @Inject("OwnerServiceRepository") private readonly repository: OwnerServicerepository,
        @Inject("LoggerProvider") private readonly logger: Logger
    ) { }

    search(aggregateId: string) {
        return new Promise(async (resolve, reject) => {
            this.repository.getOne(aggregateId)
                .then(result => {
                    if (result.length <= 0) {
                        throw new NotFoundOwnerService(`customer with id: ${aggregateId}`)
                    }
                    resolve(result);

                })
                .catch(error => {
                    if (!(error instanceof NotFoundOwnerService)) {
                        this.logger.error(error);
                        reject(new Error("Can't get data right now, please try latter"));
                    }

                    reject(error);

                })
        })
    }
}