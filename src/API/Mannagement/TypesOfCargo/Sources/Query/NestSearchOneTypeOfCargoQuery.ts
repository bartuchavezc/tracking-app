import { SearchOneTypeOfCargoQuery } from "src/APP/Mannagement/TypesOfCargo/Application/Query/SearchOneTypeOfCargoQuery";

export class NestSearchOneTypeOfCargoQuery extends SearchOneTypeOfCargoQuery {
    constructor(aggregateId: string) {
        super(aggregateId);
    }
}