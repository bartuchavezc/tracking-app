import { Injectable, Inject } from "@nestjs/common";
import { TocRepository } from "../../../Domain/TocRepository";
import { Logger } from "src/APP/Shared/Logger/Logger";
import { TocNotFound } from "../../../Domain/TocNotFound";

@Injectable()
export class SearchOneTypeOfCargo {

    constructor(
        @Inject("TocRepositoryProvider") private readonly repository: TocRepository,
        @Inject("LoggerProvider") private readonly logger: Logger
    ) { }

    search(aggregateId: string) {
        return new Promise(async (resolve, reject) => {
            await this.repository.getOne(aggregateId)
                .then(result => {

                    if(result.length <= 0 ){
                        console.log("ok")
                        throw new TocNotFound(`Type of cargo with id: ${aggregateId}`)
                    }
                    
                    resolve(result);
                })
                .catch(error => {
                    
                    if(!(error instanceof TocNotFound)){
                        this.logger.error(error); 
                        reject(error)
                    }

                    reject(error);
                })
        })
    }
}