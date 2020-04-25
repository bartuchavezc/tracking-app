import { OServiceEvent } from "../../Infraestructure/Persistence/OServiceModel";
import { IOServiceMerged } from "../../Infraestructure/Persistence/Mongoose/Model/IOserviceMerged";

export interface OServiceReadRepository {
    getAll(): Promise<IOServiceMerged[]>;
}