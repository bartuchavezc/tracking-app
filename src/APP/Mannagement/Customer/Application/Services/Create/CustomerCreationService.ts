import { CustomerStoreRepository } from 'src/APP/Mannagement/Customer/Domain/Repository/EventStore/CustomerStoreRepository';
import { Customer } from "../../../Domain/Customer";
import { Inject, Injectable } from "@nestjs/common";
import { GeneratedUuid } from "src/APP/Shared/Domain/GeneratedUuid";
import { Uuid } from "src/APP/Shared/ValueObjects/Uuid";
import { CustomerEvent } from '../../../Infraestructure/EventStore/CustomerEvent';
@Injectable()
export class CustomerCreationService {

  constructor(
    @Inject('CustomerStoreRepository') private storeRepository: CustomerStoreRepository
  ) { }

  /**
   * 
   * @param event 
   * @param name 
   * @param contact 
   */
  __invoke(event: String, name: String, contact: String): Promise<Customer> {
    return new Promise((resolve, reject) => {
      try {
        //create customer
        const customer = new Customer(
          new Uuid(GeneratedUuid.__invoke()),
          name, contact,
          new Date());

        //save customer creation event
        this.storeRepository
          .add(new CustomerEvent(
            customer.id.toString(),
            event,
            { name, contact, meta: { creaedAt: customer.createdAt } }
            , new Date())
          )
          .then(result => { //if all right return the customer
            resolve(customer);
          })
          .catch(error => {//if an error ocurred it's throw 
            throw error;
          })
      } catch (error) {//if an error ocurred reject the promise
        reject(error);
      }
    });
  }

}
