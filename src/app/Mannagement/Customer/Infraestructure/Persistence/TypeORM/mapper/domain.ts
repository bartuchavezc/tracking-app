import { Customer } from "src/app/Mannagement/Customer/Domain/Customer";
import { Uuid } from "src/app/Shared/Domain/ValueObjects/Uuid";

export function toDomainEnity(id: Uuid, name: string, contact: string, createdAt: Date) {

    return new Customer(id, name, contact, createdAt);

}