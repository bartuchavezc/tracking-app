import { Inject } from "@nestjs/common";
import { TocRepository } from "../../../Domain/TocRepository";
import { TypeOfCargo } from "../../../Domain/TypeOfCargo";
import { Uuid } from "src/APP/Shared/ValueObjects/Uuid";
import { GeneratedUuid } from "src/APP/Shared/Domain/GeneratedUuid";
import { Logger } from "src/APP/Shared/Logger/Logger";
import { TocCreationFailed } from "../../../Domain/TocCreationFailed";

export class TocCreationService {

    constructor(
        @Inject("TocRepositoryProvider") private readonly repository: TocRepository,
        @Inject("LoggerProvider") private readonly logger: Logger
    ) { }

    __invoke(cargo: String) {
        return this.persist(this.create(cargo));
    }

    private create(cargo: String) {
        return new TypeOfCargo(new Uuid(GeneratedUuid.__invoke()), cargo, { createdAt: new Date() });
    }

    private persist(toc: TypeOfCargo) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.repository.add(toc, "Created")
                    .then((result) => {
                        resolve(result);
                    })
            } catch (error) {
                this.logger.error(error);
                reject(new TocCreationFailed(error));
            }
        })

    }

}