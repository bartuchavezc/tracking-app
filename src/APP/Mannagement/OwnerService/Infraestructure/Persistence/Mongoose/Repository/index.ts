import { OServiceMongoRepository } from "./OServiceMongoRepostiroy";

export const OServiceRepositoryProviders = [
    {
        provide: "OServiceRepository",
        useClass: OServiceMongoRepository
    }
]