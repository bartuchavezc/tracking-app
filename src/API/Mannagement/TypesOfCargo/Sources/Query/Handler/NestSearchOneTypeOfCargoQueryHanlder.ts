import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { NestSearchOneTypeOfCargoQuery } from "../NestSearchOneTypeOfCargoQuery";
import { SearchOneTypeOfCargoQuery } from "src/APP/Mannagement/TypesOfCargo/Application/Query/SearchOneTypeOfCargoQuery";
import { SearchOneTypeOfCargo } from "src/APP/Mannagement/TypesOfCargo/Application/Services/Search/SearchOneTypeOfCargo";

@QueryHandler(NestSearchOneTypeOfCargoQuery)
export class SearchOneTypeOfCargoQueryHandler implements IQueryHandler<NestSearchOneTypeOfCargoQuery> {

    constructor(
        @Inject("SearchOneTypeOfCargo") private readonly tocsByCriteriaSearcher: SearchOneTypeOfCargo
    ){}

    async execute(query: SearchOneTypeOfCargoQuery){
        return await this.tocsByCriteriaSearcher.search(query.aggregateId);
    }

}