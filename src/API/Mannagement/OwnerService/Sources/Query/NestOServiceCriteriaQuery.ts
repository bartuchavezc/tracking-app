import { OServiceQuery } from "src/APP/Mannagement/OwnerService/Application/Query/OServiceQuery";
import { IQuery } from "@nestjs/cqrs";

export class NestOServiceCriteriaQuery extends OServiceQuery implements IQuery {

    constructor(
        { filters, orderBy, order, offset, limit }:
            { aggregateId?: string; filters?: []; orderBy?: String; order?: String; offset?: Number, limit?: Number } = {},
    ) {
        super();

        this.filters = filters;
        this.orderBy = orderBy;
        this.order = order;
        this.offset = offset;
        this.limit = limit

    }

}