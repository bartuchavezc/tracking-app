export class CustomerEvent{

    constructor(
        readonly aggregateId: string,
        readonly event: String,
        readonly payload,
        readonly productionDate: Date
    ){}

}