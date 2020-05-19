import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { NestSearchTocsByCriteriaQuery } from "../NestSearchTocsByCreiteriaQuery";
import { Inject } from "@nestjs/common";
import { SearchTocsByCriteriaService } from "src/APP/Mannagement/TypesOfCargo/Application/Services/Search/SearchTocsByCriteriaService";

@QueryHandler(NestSearchTocsByCriteriaQuery)
export class SearchTocsByCriteriaQueryHanlder implements IQueryHandler<NestSearchTocsByCriteriaQuery> {

    constructor(
        @Inject("SearchTocsByCriteriaService") private readonly tocsByCriteriaSearcher: SearchTocsByCriteriaService
    ){}

    execute(query: NestSearchTocsByCriteriaQuery){
        return this.tocsByCriteriaSearcher.search(query.__primitives());
    }

}