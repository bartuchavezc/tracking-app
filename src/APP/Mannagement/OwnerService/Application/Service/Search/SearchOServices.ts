import { Injectable, Inject } from "@nestjs/common";
import { OwnerServicerepository } from "../../../Domain/OwnerServiceRepository";
import { Logger } from "src/APP/Shared/Logger/Logger";

@Injectable()
export class SearchOServices {

    constructor(
        @Inject("OwnerServiceRepository") private readonly repository: OwnerServicerepository,
        @Inject("LoggerProvider") private readonly logger: Logger
    ) { }

    search() {
        return new Promise(async (resolve, reject) => {
            this.repository.getAll()
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                this.logger.error(error);
                reject(new Error("Can't get data right now, please try latter"));
            })
        })
    }

}