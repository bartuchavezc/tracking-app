export class NotEmail extends Error {
    
    constructor(value?: String){
        super(`${value} is not an email`);
    }

}