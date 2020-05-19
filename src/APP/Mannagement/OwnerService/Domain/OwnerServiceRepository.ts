import { OwnerService } from "./OwnerService";

export interface OwnerServicerepository {
    add(oservie: OwnerService, eventName: String);
    getAll();
    getByCriteria(criteria);
}