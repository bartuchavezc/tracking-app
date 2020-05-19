import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { NestOServiceAllQuery } from "../NestOServicesAllQuery";
import { Inject } from "@nestjs/common";
import { SearchOServices } from "src/APP/Mannagement/OwnerService/Application/Service/Search/SearchOServices";
import { OServiceQuery } from "src/APP/Mannagement/OwnerService/Application/Query/OServiceQuery";

@QueryHandler(NestOServiceAllQuery)
export class NestOServiceAllQueryHanlder implements IQueryHandler<NestOServiceAllQuery> {

    constructor(
        @Inject("OServiceSearchService") private readonly searchService: SearchOServices
    ) { }

    async execute(query: OServiceQuery){
        return await this.searchService.search();
    }

}