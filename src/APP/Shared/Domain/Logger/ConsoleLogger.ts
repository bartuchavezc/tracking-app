import { Logger } from "./Logger";

export class ConsoleLogger implements Logger {

    print(message: String){
        console.log(message);
    }

    warning(warningMessage: String){
        console.warn(warningMessage);
    }

    error(error: Error){
        console.error(error);
    }

}