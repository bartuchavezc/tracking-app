export class SearchTocsByCriteriaQuery {

    aggregateId;
    orderBy;
    order;
    offset;
    limit;

    public __primitives(){
        return {
            aggregateId: this.aggregateId,
            orderBy: this.orderBy,
            order: this.order,
            offset: this.offset,
            limit: this.limit
        }
    }
    

}