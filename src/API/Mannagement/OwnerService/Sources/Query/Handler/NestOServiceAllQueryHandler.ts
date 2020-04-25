import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { NestOServiceAllQuery } from "../NestOServicesAllQuery";
import { Inject } from "@nestjs/common";
import { SearchOServices } from "src/APP/Mannagement/OwnerService/Application/Service/Search/SearchOServices";
import { OwnerService } from "src/APP/Mannagement/OwnerService/Domain/OwnerService";
import { OServiceAllQuery } from "src/APP/Mannagement/OwnerService/Application/Query/OServiceAllQuery";

@QueryHandler(NestOServiceAllQuery)
export class NestOServiceAllQueryHanlder implements IQueryHandler<NestOServiceAllQuery> {

    constructor(
        @Inject("OServiceSearchService") private readonly searchService: SearchOServices
    ) { }

    execute(query: OServiceAllQuery): Promise<OwnerService[]> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.searchService
                    .search()
                    .then(services => resolve(services) )
            } catch (error) {
                reject(error);
            }
        });
    }

}