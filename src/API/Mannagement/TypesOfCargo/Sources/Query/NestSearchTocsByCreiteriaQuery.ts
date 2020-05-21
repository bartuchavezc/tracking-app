import { SearchTocsByCriteriaQuery } from "src/APP/Mannagement/TypesOfCargo/Application/Query/SearchTocsByCriteriaQuery";
import { IQuery } from "@nestjs/cqrs";

export class NestSearchTocsByCriteriaQuery extends SearchTocsByCriteriaQuery implements IQuery {

    filters: [];

    constructor(
    { filters, orderBy, order, offset, limit}: 
    { aggregateId?: string; filters?: []; orderBy?: String; order?: String; offset?: Number, limit?: Number  } = {}, 
    ){
        super();

        this.filters = filters;
        this.orderBy = orderBy;
        this.order = order;
        this.offset = offset;
        this.limit = limit;

    }

}