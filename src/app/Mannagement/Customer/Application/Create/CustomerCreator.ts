import { CustomerCommandRepository } from "../../Domain/repository/CustomerCommandRepository";
import { Customer } from "../../Domain/Customer";
import { Inject, Injectable } from "@nestjs/common";
import { CustomerCreateCommand } from "src/API/Mannagement/Customer/Commands/CustomerCreateCommand";
import { GeneratedUuid } from "src/app/Shared/Domain/GeneratedUuid";

@Injectable()
export class CustomerCreator {

    constructor(
        @Inject('CustomerCommandRepository') private repository: CustomerCommandRepository
    ) { }

    __invoke(name: string, contact: string){

    return this.create(name, contact)
    .then(
      result => {
        return new Customer(result.id, result.name, result.contact, new Date());
      }
    )
    .catch(error => error)

  }


    private async create(name, contact){

      const customer = new Customer( new GeneratedUuid().__invoke(), name, contact, new Date())
      return await this.repository.save(customer);

    }

}
