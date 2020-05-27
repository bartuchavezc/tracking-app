import { Inject } from "@nestjs/common";
import { TocRepository } from "../../../Domain/TocRepository";
import { Logger } from "src/APP/Shared/Logger/Logger";
import { TypeOfCargo } from "../../../Domain/TypeOfCargo";
import { Uuid } from "src/APP/Shared/ValueObjects/Uuid";
import { TocCreationFailed } from "../../../Domain/TocCreationFailed";

export class TocUpdateService {

    constructor(
        @Inject("TocRepositoryProvider") private readonly repository: TocRepository,
        @Inject("LoggerProvider") private readonly logger: Logger
    ) { }

    __invoke(id: string, cargo: String) {
        return this.persist(this.create(id, cargo, { updatedAt: new Date() }))
    }

    private create(id: string, cargo: String, _meta?: { createdAt?: Date, updatedAt?: Date, deletedAt?: Date }) {
        return new TypeOfCargo(new Uuid(id), cargo, _meta);
    }

    private persist(toc: TypeOfCargo): Promise<TypeOfCargo> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.repository.add(toc, "ChangedCargo")
                    .then(result => {
                        resolve(result);
                    })
            } catch (error) {
                this.logger.error(error);
                reject(new TocCreationFailed())
            }
        })
    }

}