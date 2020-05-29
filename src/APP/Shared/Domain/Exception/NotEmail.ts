export class NotEmail extends Error {
    
    constructor(value?: String){
        super(`${value} isn't a valid email`);
    }

}