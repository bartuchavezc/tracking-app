import { Inject, Injectable } from "@nestjs/common";
import { UuidValidator } from "../Domain/Uuid/UuidValidator";
import { EmailValidator } from "../Domain/Email/EmailValidator";
import { NotEmptyValidation } from "../Domain/NotEmpty/NotEmptyValidation";
import { MaxLengthValidation } from "../Domain/MaxLength/MaxLengthValidation";
import { MinLengthValidation } from "../Domain/MinLength/MinLengthValidation";

@Injectable()
export class ValidationService {

    constructor(
        @Inject("UuidValidator") private readonly uuid: UuidValidator,
        @Inject("EmailValidator") private readonly email: EmailValidator,
        @Inject("NotEmptyValidator") private readonly notEmpty: NotEmptyValidation,
        @Inject("MaxLengthValidator") private readonly maxLength: MaxLengthValidation,
        @Inject("MinLengthValidator") private readonly minLength: MinLengthValidation
    ) { }

    isUuid(uuid: string) {
        return this.uuid.validate(uuid)
    }

    isEmail(email: String) {
        return this.email.validate(email);
    }

    isNotEmpty(value: String) {
        return this.notEmpty.validate(value);
    }

    maxLengthMatch(value: String, maxLength: number) {
        return this.maxLength.validate(value, maxLength)
    }

    minLengthMatch(value: String, minLength: Number) {
        return this.minLength.validate(value, minLength)
    }

}