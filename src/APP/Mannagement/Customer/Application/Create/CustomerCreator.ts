import { CustomerCommandRepository } from "../../Domain/Repository/Command/CustomerCommandRepository";
import { Customer } from "../../Domain/Customer";
import { Inject, Injectable } from "@nestjs/common";
import { GeneratedUuid } from "src/APP/Shared/Domain/GeneratedUuid";
import { TypeOrmCustomerEntity } from "../../Infraestructure/Persistence/TypeORM/Entity/TypeOrmCustomer.entity";
import { Uuid } from "src/APP/Shared/Domain/ValueObjects/Uuid";

@Injectable()
export class CustomerCreator {

  constructor(
    @Inject('CustomerCommandRepository') private repository: CustomerCommandRepository
  ) { }

  __invoke(name: string, contact: string): Promise<Customer> {
    
    return new Promise(async (resolve, reject) => {
      await this.create(name, contact)
        .then(result => {
          resolve(new Customer(new Uuid(result.id), result.name, result.contact, result.createdAt));
        })
        .catch(error => reject(error))
    })

  }

  private async create(name: string, contact: string): Promise<TypeOrmCustomerEntity> {
    const customer = new Customer( new Uuid(new GeneratedUuid().__invoke()), name, contact, new Date());
    
    return await this.repository.save(customer);

  }

}
