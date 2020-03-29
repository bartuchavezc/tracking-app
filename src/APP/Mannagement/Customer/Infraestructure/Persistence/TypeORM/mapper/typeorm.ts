import { TypeOrmCustomerEntity } from "../Entity/TypeOrmCustomer.entity";

export function toTypeOrmEntity(id: string, name: string, contact: string, createdAt: Date): TypeOrmCustomerEntity{

    return TypeOrmCustomerEntity.register(id, name, contact, createdAt);

}