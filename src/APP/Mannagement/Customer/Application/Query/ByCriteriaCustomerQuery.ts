export class ByCriteriaCustomerQuery {
    aggregateId;
    filters;
    orderBy;
    order;
    offset;
    limit;

    public __primitives() {
        return {
            aggregateId: this.aggregateId,
            filters: this.filters,
            orderBy: this.orderBy,
            order: this.order,
            offset: this.offset,
            limit: this.limit
        }

    }

}