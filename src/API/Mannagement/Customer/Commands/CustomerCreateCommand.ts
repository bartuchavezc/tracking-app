import { ICommand } from '@nestjs/cqrs'

export class CustomerCreateCommand implements ICommand {
    
    constructor(
        readonly name: String,
        readonly contact: String
    ){}

}