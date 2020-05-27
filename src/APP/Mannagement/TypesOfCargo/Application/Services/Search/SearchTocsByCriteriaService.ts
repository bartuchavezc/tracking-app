import { Inject } from "@nestjs/common";
import { TocRepository } from "../../../Domain/TocRepository";
import { Logger } from "src/APP/Shared/Logger/Logger";
import { TocNotFound } from "../../../Domain/TocNotFound";

export class SearchTocsByCriteriaService {

    constructor(
        @Inject("TocRepositoryProvider") private readonly repository: TocRepository,
        @Inject("LoggerProvider") private readonly logger: Logger
    ) { }

    search(criteria: { filters?: []; orderBy?: String; order?: String; offset?: Number, limit?: Number }) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.repository.getByCriteria(criteria);
                resolve(result)

            } catch (error) {
                this.logger.error(error)
                reject(new Error("Error retrivering data"));
            }
        })
    }
}
