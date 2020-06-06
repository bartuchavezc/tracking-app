import { UuidValidatorUuidValidate } from "./Uuid/UuidValidatorUuidValidate";
import { EmailValidatorClassValidator } from "./Email/EmailValidatorClassValidator";
import { NotEmptyValidationClassValidator } from "./NotEmpty/NotEmptyValdiationClassValidator";
import { MaxLengthValidationPropertyValdiation } from "./MaxLength/MaxLengthValidationPropertyValidation";
import { MinLengthValidationPropertyValidation } from "./MinLength/MinLengthValidationPropertyValdiation";

export const ValidatorProviders = [
    {
        provide: "UuidValidator",
        useClass: UuidValidatorUuidValidate
    },
    {
        provide: "EmailValidator",
        useClass: EmailValidatorClassValidator
    },
    {
        provide: "NotEmptyValidator",
        useClass: NotEmptyValidationClassValidator
    },
    {
        provide: "MaxLengthValidator",
        useClass: MaxLengthValidationPropertyValdiation
    },
    {
        provide: "MinLengthValidator",
        useClass: MinLengthValidationPropertyValidation
    }
]