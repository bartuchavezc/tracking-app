import { NotFoundException } from "src/APP/Shared/Domain/Exception/NotFoundException";

export class CustomerNotFound extends NotFoundException {

    constructor(error?: string){
        super("Customer Not Found");
    }

}