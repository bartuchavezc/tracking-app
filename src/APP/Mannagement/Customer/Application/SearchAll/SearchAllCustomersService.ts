import { Injectable, Inject } from "@nestjs/common";
import { CustomerQueryRepository } from "../../Domain/Repository/Query/CustomerQueryRepository";
import { Customer } from "../../Domain/Customer";
import { Uuid } from "src/APP/Shared/Domain/ValueObjects/Uuid";
import { CustomerStoreRepository } from "../../Domain/Repository/EventStore/CustomerStoreRepository";

@Injectable()
export class SearchAllCustomersService {

    constructor(
        @Inject("CustomerStoreRepository") private readonly repository: CustomerStoreRepository
    ) { }

    async searchAll() {
        let result = await this.repository.getAll()
            .then(result => {
                console.log(result) 
                return result
            })
            .catch(err => {throw err})
        
        return result.map(self => new Customer(new Uuid(self.aggregateId), self.payload.name, self.payload.contact, self.payload.meta.createdAt));

    }

}