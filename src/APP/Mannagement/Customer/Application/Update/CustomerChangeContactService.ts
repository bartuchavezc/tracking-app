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
        
        const event = "ChangedCustomerName";

        const payload = {
            customerContact: contact
        }

        const meta= {
            updatedAt: new Date()
        }

        return await this.storeRepository.add({event, id, contact, payload, meta })
            .then(result => { 
                return {id: result.aggregateId, contact: result.payload.customerContact }
            })
            .catch(err => {
                throw err;
            })
    }

}