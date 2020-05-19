import { Inject, Injectable } from "@nestjs/common";
import { Uuid } from "src/APP/Shared/ValueObjects/Uuid";
import { OwnerService } from "../../../Domain/OwnerService";
import { OwnerServicerepository } from "../../../Domain/OwnerServiceRepository";
import { Logger } from "src/APP/Shared/Domain/Logger/Logger";


@Injectable()
export class OServiceUpdateService {

    constructor(
        @Inject("OwnerServiceRepository") private readonly repository: OwnerServicerepository,
        @Inject("LoggerProvider") private readonly logger: Logger
    ) { }

    __writed(aggregateId: string, serviceName: String, event: String){
        return this.write(this.create(aggregateId, serviceName), event)
    }

    private create(aggregateId: string, serviceName?: String) {
        return new OwnerService(new Uuid(aggregateId), serviceName, { updatedAt: new Date() });
    }

    private write(oservice: OwnerService, event: String){
        return new Promise(async (resolve, reject) => {
            try {
                await this.repository.add(oservice, event);
                resolve(oservice.toPrimitives());
            } catch (error) {
                this.logger.error(error);
                reject(new Error("can't save the data right now, try later"));
            }
        })
    }

}