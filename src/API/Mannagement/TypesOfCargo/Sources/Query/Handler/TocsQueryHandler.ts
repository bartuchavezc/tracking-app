import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { NestTocsQuery } from "../NestTocsQuery";
import { Inject } from "@nestjs/common";
import { SearchTocsService } from "src/APP/Mannagement/TypesOfCargo/Application/Services/Search/SearchTocsService";
import { TocsQuery } from "src/APP/Mannagement/TypesOfCargo/Application/Query/TocsQuery";

@QueryHandler(NestTocsQuery)
export class TocsQueryHandler implements IQueryHandler {
    
    constructor(
        @Inject("SearchTocsService") private readonly service: SearchTocsService
    ){}

    async execute(query: TocsQuery){
        return  await this.service.searchAll()
    }
}