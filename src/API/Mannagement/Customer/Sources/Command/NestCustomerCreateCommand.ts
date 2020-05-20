import { CustomerCreateCommand } from "src/APP/Mannagement/Customer/Application/Command/CustomerCreateCommand";

export class NestCustomerCreateCommand extends CustomerCreateCommand {

    constructor(name: String, contact: String){
        super(name, contact);
    }

}