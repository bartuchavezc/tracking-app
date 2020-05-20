import { CreationFailedException } from "src/APP/Shared/Domain/Exception/CreationFailedException";

export class CustomerCreationFailed extends CreationFailedException{

    /**
     * 
     * @param error dispacher exception error
     */
    constructor(error?: Error | string){
        super("Can't save the data at this moment, please try latter", error);
    }
}