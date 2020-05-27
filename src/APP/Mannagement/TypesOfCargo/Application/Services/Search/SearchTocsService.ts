import { Injectable, Inject } from "@nestjs/common";
import { TocRepository } from "../../../Domain/TocRepository";
import { Logger } from "src/APP/Shared/Logger/Logger";

@Injectable()
export class SearchTocsService {

    constructor(
        @Inject("TocRepositoryProvider") private readonly repository: TocRepository,
        @Inject("LoggerProvider") private readonly logger: Logger
    ) { }

    searchAll() {
        return new Promise(async (resolve, reject) => {
            try {
                await this.repository.getAll()
                    .then(tocs => {
                        resolve(tocs);
                    })
                    .catch(err => { throw err })
            } catch (error) {
                this.logger.error(error);
                reject(error)
            }
        })
    }

}