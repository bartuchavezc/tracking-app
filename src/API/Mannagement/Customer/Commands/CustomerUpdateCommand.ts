import { ICommand } from '@nestjs/cqrs'

export class CustomerUpdateCommand implements ICommand {
    
    id: string;
    name: String;
    contact: String;

    constructor(id: string, {name, contact}){
        this.id = id;
        if(name) this.name = name;
        if(contact) this.contact = contact;
    }

}