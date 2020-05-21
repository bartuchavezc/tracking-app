import { NotFoundException } from "src/APP/Shared/Domain/Exception/NotFoundException";

export class NotFoundOwnerService extends NotFoundException {
    /**
     * 
     * @param error dispacher exception error
     */
    constructor(error?: String | Error){
        super(`Owner Service NotFound \n ${error}`);
    }

}