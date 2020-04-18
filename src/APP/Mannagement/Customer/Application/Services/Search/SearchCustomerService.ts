import { Injectable, Inject } from "@nestjs/common";
import { Customer } from "../../../Domain/Customer";
import { Uuid } from "src/APP/Shared/Domain/ValueObjects/Uuid";
import { CustomerStoreRepository } from "../../../Domain/Repository/EventStore/CustomerStoreRepository";

@Injectable()
export class SearchCustomersService {

    constructor(
        @Inject("CustomerStoreRepository") private readonly repository: CustomerStoreRepository
    ) { }

    async searchAll() {
        let customers = await this.repository
            .getAll()
            .then(result => {
                console.log(result); 
                return result
            })
            .catch(err => {throw err})
        
        return customers.map(customer => new Customer(new Uuid(customer._id), customer.aggregate.payload.name, customer.aggregate.payload.contact, customer.aggregate.payload.meta.createdAt));

    }

}