import { SearcherNotWorkException } from "src/APP/Shared/Domain/Exception/SearcherNotWorkException";

export class CustomerSearcherNotWork extends SearcherNotWorkException{

    constructor(error?: String | Error){
        super("Searcher doesn't work right now try latter");
    }

}