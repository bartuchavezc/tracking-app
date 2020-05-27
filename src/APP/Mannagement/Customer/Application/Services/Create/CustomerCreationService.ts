import { Customer } from "../../../Domain/Customer";
import { Inject, Injectable } from "@nestjs/common";
import { GeneratedUuid } from "src/APP/Shared/Domain/GeneratedUuid";
import { Uuid } from "src/APP/Shared/ValueObjects/Uuid";
import { CustomerRepository } from '../../../Domain/CustomerRepository';
import { CustomerCreationFailed } from "../../../Domain/CustomerCreationFailed";
import { Logger } from "src/APP/Shared/Logger/Logger";
@Injectable()
export class CustomerCreationService {

  constructor(
    @Inject('CustomerRepositoryProvider') private repository: CustomerRepository,
    @Inject("LoggerProvider") private readonly logger: Logger
  ) { }

  /**
   * 
   * @param event 
   * @param name 
   * @param contact 
   */
  __invoke(name: String, contact: String, event: String){
    console.log(this.create(name, contact))
    return this.persist(this.create(name, contact), event);
  }

  private create(name: String, contact: String) {
    return new Customer(new Uuid(GeneratedUuid.__invoke()), { name, contact }, { createdAt: new Date() })
  }

  private persist(customer: Customer, event: String){
    return new Promise(async (resolve, reject) => {
      await this.repository.add(customer, event)
        .then(result => {
          resolve(customer.toPrimitives())
        })
        .catch(error => {
          this.logger.error(error);
          reject(new CustomerCreationFailed());
        })
    })
  }

}
