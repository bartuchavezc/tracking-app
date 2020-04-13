export class CustomerSnapShot {
    constructor(
        readonly aggregateId: string,
        readonly event: String,
        readonly payload: {
            name: String,
            contact: String,
            meta: {
                createdAt: String,
                deletedAt: String,
                updatedAt: String,
            }
        },
        readonly productionDate: Date
    ) { }
}