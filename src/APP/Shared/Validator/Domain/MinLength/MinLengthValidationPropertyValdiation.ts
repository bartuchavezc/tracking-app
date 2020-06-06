import { MinLengthValidation } from "./MinLengthValidation";
import { MinLengthViolation } from "src/APP/Shared/Domain/Exception/MinLengthViolation";

export class MinLengthValidationPropertyValidation implements MinLengthValidation {

    validate(value: String, minLength: number) {
        return new Promise((resolve, reject) => {
            value.length < minLength
                ? reject(new MinLengthViolation(value, minLength))
                : resolve()
        })
    }

}