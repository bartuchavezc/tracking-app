export class OServiceQuery {
    filters;
    orderBy;
    order;
    offset;
    limit;

    public __primitives() {
        return {
            filters: this.filters,
            orderBy: this.orderBy,
            order: this.order,
            offset: this.offset,
            limit: this.limit
        }

    }

}