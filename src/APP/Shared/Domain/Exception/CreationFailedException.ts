export class CreationFailedException extends Error{

    constructor(message?: string, private error?: Error | string){
        super();
        this.error = error;
        this.message = message;
    }

}