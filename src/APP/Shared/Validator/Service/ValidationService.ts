import { Inject, Injectable } from "@nestjs/common";
import { UuidValidator } from "../Domain/Uuid/UuidValidator";
import { EmailValidator } from "../Domain/Email/EmailValidator";

@Injectable()
export class ValidationService {

    constructor(
        @Inject("UuidValidator") private readonly uuid: UuidValidator,
        @Inject("EmailValidator") private readonly email: EmailValidator
    ) { }

    isUuid(uuid: string) {
        return this.uuid.validate(uuid)
    }

    isEmail(email: String){
        return this.email.validate(email);
    }

}