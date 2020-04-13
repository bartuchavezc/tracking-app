import { CustomerStoreRepository } from 'src/APP/Mannagement/Customer/Domain/Repository/EventStore/CustomerStoreRepository';
import { Customer } from "../../Domain/Customer";
import { Inject, Injectable } from "@nestjs/common";
import { GeneratedUuid } from "src/APP/Shared/Domain/GeneratedUuid";
import { Uuid } from "src/APP/Shared/Domain/ValueObjects/Uuid";
import { CustomerEvent } from '../../Infraestructure/EventStore/CustomerEvent';
@Injectable()
export class CustomerCreator {

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

  /**
   * 
   * 
    return new Promise(async (resolve, reject) => {


      const event = 'CustomerCreatedEvent';

      const id = new Uuid(new GeneratedUuid().__invoke());

      const status = 'created' // created | updated | deleted
      const payload = {
        customerName: name,
        customerContact: contact
      }

      const meta = {
        createdAt: new Date()
      }

      await this.storeRepository
        .add({ event, id: id.toString(), status, payload, meta })
        .then((result) => {
          let customer = mapped(result);
          resolve(new Customer(new Uuid(customer.id), customer.name, customer.contact, customer.createdAt));
        })
        .catch(error => reject(error))
    })
   */

}
