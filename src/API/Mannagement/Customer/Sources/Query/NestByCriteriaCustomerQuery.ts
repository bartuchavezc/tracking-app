import { ByCriteriaCustomerQuery } from "src/APP/Mannagement/Customer/Application/Query/ByCriteriaCustomerQuery";

export class NestByCriteriaCustomerQuery extends ByCriteriaCustomerQuery {
    
    constructor(
        { filters, orderBy, order, offset, limit }:
            { filters?: []; orderBy?: String; order?: String; offset?: Number, limit?: Number } = {},
    ) {
        super();

        this.filters = filters;
        this.orderBy = orderBy;
        this.order = order;
        this.offset = offset;
        this.limit = limit

    }

}