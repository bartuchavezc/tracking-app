import { CustomerStoreRepository } from 'src/APP/Mannagement/Customer/Domain/Repository/EventStore/CustomerStoreRepository';
import { Customer } from "../../Domain/Customer";
import { Inject, Injectable } from "@nestjs/common";
import { GeneratedUuid } from "src/APP/Shared/Domain/GeneratedUuid";
import { Uuid } from "src/APP/Shared/Domain/ValueObjects/Uuid";
import { MongoCustomer } from '../../Infraestructure/EventStore/Mongoose/Schema/MongoCustomer';
import { mapped } from '../../Infraestructure/EventStore/Mongoose/mapper/toDoaminEntity';

@Injectable()
export class CustomerCreator {

  constructor(
    @Inject('CustomerStoreRepository') private storeRepository: CustomerStoreRepository
  ) { }

  __invoke(name: string, contact: string): Promise<Customer> {

    return new Promise(async (resolve, reject) => {

      const id = new Uuid(new GeneratedUuid().__invoke());

      const status = 'usable'
      const payload = {
        customerName: name,
        customerContact: contact
      }

      const meta = {
        title: 'customerCreatedEvent',
        createdAt: new Date()
      }

      await this.storeRepository
        .add({ id: id.toString(), status, payload, meta })
        .then((result) => {
          let customer = mapped(result);
          resolve(new Customer(new Uuid(customer.id), customer.name, customer.contact, customer.createdAt));
        })
        .catch(error => reject(error))
    })

  }

}
