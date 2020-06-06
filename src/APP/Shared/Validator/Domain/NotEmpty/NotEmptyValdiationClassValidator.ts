import { NotEmptyValidation } from "./NotEmptyValidation";
import { IsNotEmpty, validate } from "class-validator";
import { NotEmptyExpected } from "src/APP/Shared/Domain/Exception/NotEmptyExpected";

export class NotEmptyValidationClassValidator implements NotEmptyValidation {

    @IsNotEmpty()
    value: String;

    validate(value: String) {
        this.value = value

        return new Promise(async (resolve, reject) => {
            await validate(this)
                .then(result => {
                    if (result.length > 0) {
                        throw new NotEmptyExpected()
                    } else {
                        resolve()
                    }
                })
                .catch(error => reject(error))
        });

    }
}