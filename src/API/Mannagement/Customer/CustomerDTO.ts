import { IsEmail, IsNotEmpty } from 'class-validator';

export class CustomerDTO{

    @IsNotEmpty()
    public readonly name: string;

    @IsEmail()
    public readonly contact: string;

    constructor({name, contact}){
        this.name = name;
        this.contact = contact
    }

}