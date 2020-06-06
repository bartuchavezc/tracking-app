import { EmailValidator } from "./EmailValidator";
import { IsEmail, validate } from "class-validator";
import { NotEmail } from "src/APP/Shared/Domain/Exception/NotEmail";

export class EmailValidatorClassValidator implements EmailValidator {

    @IsEmail()
    email: String;

    validate(email: String) {
        this.email = email;
        return new Promise(async (resolve, reject) => {
            await validate(this)
                .then(result => {
                    if (result.length <= 0) resolve()
                    else throw new NotEmail(email)
                })
                .catch(error => reject(error));
        })
    }

}