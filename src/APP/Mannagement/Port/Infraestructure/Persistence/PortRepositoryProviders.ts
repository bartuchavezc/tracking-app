import { PortMongooseReadRepository } from "./Mongoose/PortMongooseReadRepository";
import { PortMongooseWriteRepository } from "./Mongoose/PortMongooseWriteRepository";

export const PortRepositoryProviders = [
    {
        provide: "PortReadRepositoryProvider",
        useClass: PortMongooseReadRepository
    },
    {
        provide: "PortWriteRepositoryProvider",
        useClass: PortMongooseWriteRepository
    }
]