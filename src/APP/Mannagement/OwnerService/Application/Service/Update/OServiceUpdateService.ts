import { Inject, Injectable } from "@nestjs/common";
import { OServiceWriteRepository } from "../../../Domain/Repository/OServiceWriteRepository";
import { OServiceEvent } from "../../../Infraestructure/Persistence/OServiceModel";
import { Uuid } from "src/APP/Shared/Domain/ValueObjects/Uuid";
import { GeneratedUuid } from "src/APP/Shared/Domain/GeneratedUuid";
import { OwnerService } from "../../../Domain/OwnerService";

@Injectable()
export class OServiceUpdateService {

    constructor(
        @Inject("OServiceRepository") private readonly repository: OServiceWriteRepository
    ) { }

    write(id: string, name: String) {
        return new Promise(async (resolve, reject) => {
            try {
                const updated = await this.repository.add(new OServiceEvent(id, "ChangedServiceName", { name, updateAt: new Date() }, new Date()))
                resolve(new OwnerService(new Uuid(updated.aggregateId), updated.payload.name))
            } catch (error) {
                reject(error);
            }
        });
    }

}