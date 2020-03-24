import { InternalServerErrorException } from "@nestjs/common";

export class DoesNotUuidException extends InternalServerErrorException{
    constructor(){
        super('DoesNotUuidException', 'Does not allow uuid value')
    }
}