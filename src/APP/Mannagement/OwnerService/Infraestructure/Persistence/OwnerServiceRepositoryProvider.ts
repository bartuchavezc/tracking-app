import { OwnerServiceMongooseRepository } from "./Mongoose/OwnerServiceMongooseRepository";

export const OwnerServiceRepositoryProvider = {
    provide: "OwnerServiceRepository",
    useClass: OwnerServiceMongooseRepository
}