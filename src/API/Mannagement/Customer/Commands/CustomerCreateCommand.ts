import { ICommand } from '@nestjs/cqrs'

export class CustomerCreateCommand implements ICommand {
    
    constructor(
        readonly id: string,
        readonly name: string,
        readonly contact: string
    ){}

}