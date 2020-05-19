import { NotFoundException } from "src/APP/Shared/Domain/Exception/NotFoundException";

export class NotFoundOwnerService extends NotFoundException {
    /**
     * 
     * @param error dispacher exception error
     */
    constructor(){
        super(`Owner Service NotFound`);
    }

}