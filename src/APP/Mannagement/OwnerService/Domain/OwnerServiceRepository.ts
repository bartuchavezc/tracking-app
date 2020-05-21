import { OwnerService } from "./OwnerService";

export interface OwnerServicerepository {
    add(oservie: OwnerService, eventName: String);
    getAll();
    getOne(aggregateId: string);
    getByCriteria(criteria);
}