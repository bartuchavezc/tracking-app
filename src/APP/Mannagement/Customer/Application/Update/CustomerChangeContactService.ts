import { CustomerStoreRepository } from "../../Domain/Repository/EventStore/CustomerStoreRepository";
import { Inject } from "@nestjs/common";

export class CustomerChangeContactService {
    constructor(
        @Inject("CustomerStoreRepository") private readonly storeRepository: CustomerStoreRepository
    ) { }

    /**
     * 
     * @param id customer aggregate id
     * @param contact the new customer contact
     */
    async makeChange(id: String, contact: String): Promise<any> {
        await this.storeRepository.add({ id, contact })
            .then(result => { 
                return {id: result.aggregateId, contact: result.payload.customerContact }
            })
            .catch(err => {
                throw err;
            })
    }

}