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
        
        const event = "ChangedCustomerName";

        const payload = {
            customerName: name
        }

        const meta= {
            updatedAt: new Date()
        }

        return await this.storeRepository.add({ event, id, payload, meta })
            .then(result => { 
               
                return {id: result.aggregateId, name: result.payload.customerName}
            
            })
            .catch(err => {
                
                throw err;
            
            })
    }

}