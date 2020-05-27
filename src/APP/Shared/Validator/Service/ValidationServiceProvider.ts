import { ValidationService } from "./ValidationService";

export const ValidationServiceProvider = [
    {
        provide: "ValidationService",
        useClass: ValidationService
    }
]