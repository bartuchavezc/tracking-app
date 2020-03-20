import { CustomerCommandRepository } from "../../Domain/repository/CustomerCommandRepository";
import { Customer } from "../../Domain/Customer";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class CustomerCreator {

    constructor(
        @Inject('CustomerCommandRepository') private repository: CustomerCommandRepository
    ) { }

    async __invoke(customer: Customer) {

        return await this.repository.save(customer.toPrimitives())
            .then( () => { 
                customer.createdAt = new Date() 
                return customer  
            }).catch(e => {

                customer.creationFailure = {
                    error: e, 
                    message: `error creando el customer id: ${customer.getId}`
                }

                return customer;
            
            })

    }



    public toDomainCustomer(id: string, name: string, contact: string): Customer {
        return new Customer(id, name, contact);
    }

}