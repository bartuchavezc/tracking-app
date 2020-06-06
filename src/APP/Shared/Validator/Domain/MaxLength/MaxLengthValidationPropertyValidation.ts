import { MaxLengthValidation } from "./MaxLengthValidation";
import { MaxLengthViolation } from "src/APP/Shared/Domain/Exception/MaxLengthViolation";

export class MaxLengthValidationPropertyValdiation implements MaxLengthValidation {

    validate(value: String, maxLength: number) {
        return new Promise((resolve, reject) => {
            value.length > maxLength
                ? reject(new MaxLengthViolation(value, maxLength))
                : resolve()
        })
    }

}