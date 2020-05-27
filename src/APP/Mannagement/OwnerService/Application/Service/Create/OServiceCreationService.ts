import { Inject, Injectable } from "@nestjs/common";
import { Uuid } from "src/APP/Shared/ValueObjects/Uuid";
import { GeneratedUuid } from "src/APP/Shared/Domain/GeneratedUuid";
import { OwnerService } from "../../../Domain/OwnerService";
import { Logger } from "src/APP/Shared/Logger/Logger";
import { OwnerServicerepository } from "../../../Domain/OwnerServiceRepository";

@Injectable()
export class OServiceCrationService {

    constructor(
        @Inject("OwnerServiceRepository") private readonly repository: OwnerServicerepository,    
        @Inject("LoggerProvider") private readonly logger: Logger
    ) { }

    __invoke(serviceName: String, event: String): Promise<OwnerService>{
        return this.persist(this.create(serviceName), event)
    }

    private create(serviceName: String) {
        return new OwnerService(new Uuid(GeneratedUuid.__invoke()), serviceName, { createdAt: new Date() }
        )
    }

    private persist(oservice: OwnerService, event: String): Promise<OwnerService> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.repository.add(oservice, event)
                resolve(oservice)
            } catch (error) {
                this.logger.error(error);
                reject(error);
            }
        })
    }

}