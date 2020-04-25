import { OServiceMongoRepository } from "./OServiceMongoRepostiroy";
import { OServiceMongoReadRepository } from "./OServiceMongoReadRepositoryt";

export const OServiceRepositoryProviders = [
    {
        provide: "OServiceRepository",
        useClass: OServiceMongoRepository
    },
    {
        provide: "OServiceReadRepository",
        useClass: OServiceMongoReadRepository
    }
]