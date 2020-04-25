import { Inject, Injectable } from "@nestjs/common";
import { OServiceWriteRepository } from "../../../Domain/Repository/OServiceWriteRepository";
import { OServiceEvent } from "../../../Infraestructure/Persistence/OServiceModel";
import { Uuid } from "src/APP/Shared/Domain/ValueObjects/Uuid";


@Injectable()
export class OServiceUpdateService {

    constructor(
        @Inject("OServiceRepository") private readonly repository: OServiceWriteRepository
    ) { }

    write(id: Uuid, name: String) {
        return new Promise(async (resolve, reject) => {
            try {
                const updated = await this.repository.add(new OServiceEvent(id.toString(), "ChangedServiceName", { name, meta: { updatedAt: new Date() } }, new Date()))
                resolve(updated);
            } catch (error) {
                reject(error);
            }
        });
    }

}