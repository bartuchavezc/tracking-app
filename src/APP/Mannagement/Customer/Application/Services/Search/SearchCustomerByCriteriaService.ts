import { Injectable, Inject } from "@nestjs/common";
import { CustomerStoreRepository } from "../../../Domain/Repository/EventStore/CustomerStoreRepository";
import { CustomerResponseDTO } from "../../CustomerReponseDTO";


@Injectable()
export class SearchCustomerByCriteriaService {

    constructor(
        @Inject("CustomerStoreRepository") private readonly repository: CustomerStoreRepository
    ) { }

    async getById(id: string) {
        let customers = await this.repository
            .getById(id)
            .then(result => {
                console.log(result);
                return result;
            })
            .catch(error => {throw error})
        
        return new CustomerResponseDTO(customers[0].aggregateId, customers[0].aggregate.payload.name, customers[0].aggregate.payload.contact);
    }

}