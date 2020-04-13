import { Inject } from "@nestjs/common";
import { CustomerStoreRepository } from "../../Domain/Repository/EventStore/CustomerStoreRepository";
import { EventCustomerMongoRepository } from "../../Infraestructure/EventStore/Mongodb/Repository/EventCustomerMongoRepository";

export class CustomerChangeNameService {

    constructor(
        @Inject("CustomerStoreRepository") private readonly storeRepository: EventCustomerMongoRepository
    ) { }

    /**
     * 
     * @param id customer aggregate id
     * @param name the new customer name
     */
    async makeChange(aggregateId: string, name: String): Promise<any> {
        
        const event = "ChangedCustomerName";

        const payload = {
            name, updatedAt: new Date()
        }

        return await this.storeRepository.add({ event, aggregateId, payload, productionDate: new Date() })
            .then(result => { 
               
                return {id: result.aggregateId, name: result.payload.name}
            
            })
            .catch(err => {
                
                throw err;
            
            })
    }

}