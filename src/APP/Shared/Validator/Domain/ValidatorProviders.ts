import { UuidValidatorUuidValidate } from "./Uuid/UuidValidatorUuidValidate";
import { EmailValidatorClassValidator } from "./Email/EmailValidatorClassValidator";

export const ValidatorProviders = [
    {
        provide: "UuidValidator",
        useClass: UuidValidatorUuidValidate
    },
    {
        provide: "EmailValidator",
        useClass: EmailValidatorClassValidator
    }
]