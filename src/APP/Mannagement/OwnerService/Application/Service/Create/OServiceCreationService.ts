import { Inject } from "@nestjs/common";
import { OServiceWriteRepository } from "../../../Domain/Repository/OServiceWriteRepository";
import { OServiceEvent } from "../../../Infraestructure/Persistence/OServiceModel";
import { Uuid } from "src/APP/Shared/Domain/ValueObjects/Uuid";
import { GeneratedUuid } from "src/APP/Shared/Domain/GeneratedUuid";

export class OServiceCrationService {

    constructor(
        @Inject("OServiceRepository") private readonly repository: OServiceWriteRepository
    ){}

    async create(serviceName: String): Promise<any>{
        return new Promise(async (resolve, reject) => {
            try {
                const serviceCreated = await this.repository.add(
                    new OServiceEvent(
                        new Uuid(GeneratedUuid.__invoke()).toString(),
                        "Created Service",
                        {
                            name: serviceName,
                            meta: {
                                createdAt: new Date()
                            }
                        },
                        new Date() //production date
                    ));
                resolve(serviceCreated);
            } catch (error) {
                reject(error);
            }
        })
    }

}