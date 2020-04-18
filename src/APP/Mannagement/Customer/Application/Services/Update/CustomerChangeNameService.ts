import { Inject } from "@nestjs/common";
import { CustomerStoreRepository } from "../../../Domain/Repository/EventStore/CustomerStoreRepository";
import { CustomerEvent } from "../../../Infraestructure/EventStore/CustomerEvent";

export class CustomerChangeNameService {

    constructor(
        @Inject("CustomerStoreRepository") private readonly storeRepository: CustomerStoreRepository
    ) { }

    /**
     * 
     * @param id customer aggregate id
     * @param name the new customer name
     */
    async makeChange(aggregateId: string, name: String){
        
        const event = "ChangedCustomerName";

        const payload = {
            name, updatedAt: new Date()
        }

        return await this.storeRepository.add(new CustomerEvent(aggregateId, event, payload, new Date()))
            .then(result => { 
               
                return {id: result.aggregateId, name: result.payload.name}
            
            })
            .catch(err => {
                
                throw err;
            
            })
    }

}