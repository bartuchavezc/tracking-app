import { Inject } from "@nestjs/common";
import { CustomerStoreRepository } from "../../Domain/Repository/EventStore/CustomerStoreRepository";

export class CustomerChangeNameService {

    constructor(
        @Inject("CustomerStoreRepository") private readonly storeRepository: CustomerStoreRepository
    ) { }

    /**
     * 
     * @param id customer aggregate id
     * @param name the new customer name
     */
    async makeChange(id: String, name: String): Promise<any> {
        await this.storeRepository.add({ id, name })
            .then(result => { 
                return {id: result.aggregateId, name: result.payload.customerName}
            })
            .catch(err => {
                throw err;
            })
    }

}