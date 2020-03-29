import { CustomerCommandRepository } from "../../../Domain/Repository/Command/CustomerCommandRepository";
import { Customer } from "../../../Domain/Customer";
import { mapper } from "./mapper";
import { Injectable, Inject } from "@nestjs/common";
import { Connection, Repository } from "typeorm";
import { TypeOrmCustomerEntity } from "./Entity/TypeOrmCustomer.entity";
import { DbCommandConnection } from "src/Databases/CommandsDB/DbCommandConnection";

@Injectable()
export class TypeOrmCustomerCommandRepository implements CustomerCommandRepository {

    private connection: Promise<Connection>
    private repository: Repository<TypeOrmCustomerEntity>

    constructor(
        @Inject('COMMAND_DB_CONNECTION') private dbCommandConnection: DbCommandConnection
    ){

       this.connection = this.dbCommandConnection.getConnection()
        this.connection.then(result => {
            this.repository = result.getRepository(TypeOrmCustomerEntity)
        })
    }
    async save(customer: Customer): Promise<TypeOrmCustomerEntity> {

        const { id , name, contact } = customer.toPrimitives();
        const createdAt = customer.createdAt;
        
        return await this.repository.save(mapper.toTypeOrmEntity(id, name, contact, createdAt));

    }

    delete(id: string) {
        return `customer ${id} deleted`;
    }

}
