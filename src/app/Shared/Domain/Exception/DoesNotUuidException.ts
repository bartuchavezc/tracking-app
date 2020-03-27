import { InternalServerErrorException } from "@nestjs/common";

export class DoesNotUuidException extends InternalServerErrorException{
    constructor(error){
        super(error, 'Does not allow uuid value')
    }
}