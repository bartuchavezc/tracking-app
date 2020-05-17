import { NotFoundException } from "src/APP/Shared/Domain/Exception/NotFoundException";

export class TocNotFound extends NotFoundException{
    /**
     * 
     * @param error dispacher exception error
     */
    constructor(error?: string){
        super(error);
    }

    
}