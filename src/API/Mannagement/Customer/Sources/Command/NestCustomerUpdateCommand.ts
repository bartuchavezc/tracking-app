import { ICommand } from '@nestjs/cqrs'
import { CustomerUpdateCommand } from 'src/APP/Mannagement/Customer/Application/Command/CustomerUpdateCommand';

export class NestCustomerUpdateCommand extends CustomerUpdateCommand implements ICommand {
    
    constructor(id: string, {name, contact}){
        super(id, name, contact);    
    }

}