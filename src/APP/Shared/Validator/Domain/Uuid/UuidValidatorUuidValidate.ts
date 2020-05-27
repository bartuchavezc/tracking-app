import * as validate from "uuid-validate"
import { NotUuid } from "../../../Domain/Exception/NotUuid";
import { UuidValidator } from "./UuidValidator";

export class UuidValidatorUuidValidate implements UuidValidator{

    validate(uuid: string){
        return new Promise((resolve, reject) => {
            validate(uuid, 4)? resolve(): reject(new NotUuid(uuid))
        })
    }

}