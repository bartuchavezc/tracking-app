import { ICommand } from '@nestjs/cqrs'
import { CustomerCreateCommand } from 'src/APP/Mannagement/Customer/Application/Command/CustomerCreateCommand';

export class NestCustomerCreateCommand extends CustomerCreateCommand  implements ICommand {
    
    constructor(name: String, contact: String){
        super(name, contact)
    }

}