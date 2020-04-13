import { CustomerStoreRepository } from "../../Domain/Repository/EventStore/CustomerStoreRepository";
import { Inject } from "@nestjs/common";
import { EventCustomerMongoRepository } from "../../Infraestructure/EventStore/Mongodb/Repository/EventCustomerMongoRepository";

export class CustomerChangeContactService {
    constructor(
        @Inject("CustomerStoreRepository") private readonly storeRepository: EventCustomerMongoRepository
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


        return await this.storeRepository.add({event, aggregateId, payload, productionDate: new Date() })
            .then(result => { 
                return {id: result.aggregateId, contact: result.payload.contact }
            })
            .catch(err => {
                throw err;
            })
    }

}