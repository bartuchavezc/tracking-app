import { InternalServerErrorException } from "@nestjs/common";

export class CreationFailedException extends InternalServerErrorException{

    constructor(private error: Error | string, producer: string){
        super(error, `at ${producer}.`);
    }

}