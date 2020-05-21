import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { NestOneOServiceQuery } from "../NestOneOServiceQuery";
import { OneOServiceQuery } from "src/APP/Mannagement/OwnerService/Application/Query/OneOServiceQuery";
import { SearchOneOwnerService } from "src/APP/Mannagement/OwnerService/Application/Service/Search/SearchOneOwnerService";

@QueryHandler(NestOneOServiceQuery)
export class NestOneOServiceQueryHanlder implements IQueryHandler<NestOneOServiceQuery> {

    constructor(
        @Inject("OneOServiceSearchService") private readonly service: SearchOneOwnerService
    ) { }

    async execute(query: OneOServiceQuery){
        return await this.service.search(query.aggregateId);
    }

}