import { CustomerCommandRepository } from "../../../Domain/repository/CustomerCommandRepository";
import { Customer } from "../../../Domain/Customer";
import { mapper } from "./mapper";
import { Injectable } from "@nestjs/common";
import { getConnection } from "typeorm";
import { TypeOrmCustomerEntity } from "./Entity/TypeOrmCustomer.entity";

@Injectable()
export class TypeOrmCustomerCommandRepository implements CustomerCommandRepository {

    private repository = getConnection("ComandsDatabase").getRepository(TypeOrmCustomerEntity)

    async save(customer: Customer): Promise<TypeOrmCustomerEntity> {

        const { id , name, contact } = customer.toPrimitives();
        return await this.repository.save(mapper.toTypeOrmEntity(id , name, contact));

    }

    delete(id: string) {
        return `customer ${id} deleted`;
    }

}
