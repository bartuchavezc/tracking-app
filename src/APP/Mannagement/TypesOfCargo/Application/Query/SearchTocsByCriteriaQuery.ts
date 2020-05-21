export class SearchTocsByCriteriaQuery {

    orderBy;
    order;
    offset;
    limit;

    public __primitives(){
        return {
            orderBy: this.orderBy,
            order: this.order,
            offset: this.offset,
            limit: this.limit
        }
    }
    

}