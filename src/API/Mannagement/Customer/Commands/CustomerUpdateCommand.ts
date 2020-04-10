import { ICommand } from '@nestjs/cqrs'

export class CustomerUpdateCommand implements ICommand {
    
    id: String;
    name: String;
    contact: String;

    constructor({id, name, contact}: {id: String, name: String, contact: String}){
        if(id) this.id = id;
        if(name) this.name = name;
        if(contact) this.contact = contact;
    }

}