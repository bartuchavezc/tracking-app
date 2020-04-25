import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { NestOServiceCriteriaQuery } from "../NestOServiceCriteriaQuery";
import { OServiceQuery } from "src/APP/Mannagement/OwnerService/Application/Query/OServiceQuery";
import { Inject } from "@nestjs/common";
import { SearchOServiceByCriteria } from "src/APP/Mannagement/OwnerService/Application/Service/Search/SearchOServiceByCriteria";

@QueryHandler(NestOServiceCriteriaQuery)
export class NestOServiceCriteriaQueryHandler implements IQueryHandler<NestOServiceCriteriaQuery>{

    constructor(
        @Inject("OServiceSearchByCriteriaService") private readonly searchService: SearchOServiceByCriteria
    ) { }

    execute(query: OServiceQuery) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.searchService.searchByCriteria(query).then(result => resolve(result))
            } catch (error) {
                reject(error);
            }
        })
    }

}