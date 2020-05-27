import { InternalServerErrorException } from "@nestjs/common";

export class NotUuid extends Error{
    constructor(uuid?: string){
        super(`${uuid}: isn't allow uuid value`)
    }
}