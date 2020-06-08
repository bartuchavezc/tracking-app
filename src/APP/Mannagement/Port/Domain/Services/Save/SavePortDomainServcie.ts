import { Inject } from "@nestjs/common";
import { PortWriteRepository } from "../../PortWriteRepository";
import { Logger } from "src/APP/Shared/Logger/Logger";
import { Port } from "../../Port";
import { PortReadRepository } from "../../PortReadRepository";
import { Uuid } from "src/APP/Shared/ValueObjects/Uuid";
import { GeneratedUuid } from "src/APP/Shared/Domain/GeneratedUuid";

export class SavePortDomainService {

    constructor(
        @Inject("PortWriteRepositoryProvider") private readonly writeRepository: PortWriteRepository,
        @Inject("PortReadRepositoryProvider") private readonly readRepository: PortReadRepository,
        @Inject("LoggerProvider") private readonly logger: Logger
    ) { }

    public conditionalCreation(port: Port) {
        this.compare(port);
    }

    private async compare(port: Port) {
        await this.readRepository.compareLocation(port.location)
            .then(result => { if (result == false) this.save(port) })
            .catch(error => this.logger.error(error))
    }

    private async save(port: Port) {
        port._setAaggregateId(new Uuid(GeneratedUuid.__invoke()));
        this.writeRepository.save(port, 'created port').catch(error => this.logger.error(error))
    }


}