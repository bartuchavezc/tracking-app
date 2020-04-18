import { CustomerStoreRepository } from "../../../Domain/Repository/EventStore/CustomerStoreRepository";
import { Inject } from "@nestjs/common";
import { CustomerEvent } from "../../../Infraestructure/EventStore/CustomerEvent";

export class CustomerChangeContactService {
    constructor(
        @Inject("CustomerStoreRepository") private readonly storeRepository: CustomerStoreRepository
    ) { }

    /**
     * 
     * @param id customer aggregate id
     * @param contact the new customer contact
     */
    async makeChange(aggregateId: string, contact: String): Promise<any> {
        
        const event = "ChangedCustomerName";

        const payload = {
            contact,
            updateAt: new Date()
        }


        return await this.storeRepository.add(new CustomerEvent(event, aggregateId, payload, new Date()))
            .then(result => { 
                return {id: result.aggregateId, contact: result.payload.contact }
            })
            .catch(err => {
                throw err;
            })
    }

}