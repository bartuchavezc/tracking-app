import { TocMongooseRepository } from "./Mongoose/TocMongooseRepository";

export const TocRepositoryProvider = [
    {
        provide: "TocRepositoryProvider",
        useClass: TocMongooseRepository
    }
]