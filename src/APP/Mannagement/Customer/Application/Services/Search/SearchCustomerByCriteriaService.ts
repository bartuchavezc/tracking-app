import { Injectable, Inject } from "@nestjs/common";
import { CustomerResponseDTO } from "../../CustomerReponseDTO";
import { ICustomerQueryRepository } from "../../../Domain/Repository/Query/ICustomerQueryRepository";


@Injectable()
export class SearchCustomerByCriteriaService {

    constructor(
        @Inject("CustomerQueryRepository") private readonly repository: ICustomerQueryRepository
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