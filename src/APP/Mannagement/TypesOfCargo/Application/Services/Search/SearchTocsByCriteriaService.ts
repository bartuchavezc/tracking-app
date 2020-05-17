import { Inject } from "@nestjs/common";
import { TocRepository } from "../../../Domain/TocRepository";
import { Logger } from "src/APP/Shared/Domain/Logger/Logger";
import { TocNotFound } from "../../../Domain/TocNotFound";

export class SearchTocsByCriteriaService {

    constructor(
        @Inject("TocRepositoryProvider") private readonly repository: TocRepository,
        @Inject("LoggerProvider") private readonly logger: Logger
    ) { }

    search(criteria: { aggregateId?: string; filters?: []; orderBy?: String; order?: String; offset?: Number, limit?: Number }) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.repository.getByCriteria(criteria);

                if (!criteria.aggregateId) {
                    resolve(result);
                }

                if (result.length > 0) {
                    resolve(result);
                }

                throw new TocNotFound("Not Found Type of cargo with id: " + criteria.aggregateId)

            } catch (error) {

                if (!(error instanceof TocNotFound)) {
                    this.logger.error(error)
                    reject(new Error("Error retrivering data"));

                }

                reject(error);
            }
        })
    }

}
