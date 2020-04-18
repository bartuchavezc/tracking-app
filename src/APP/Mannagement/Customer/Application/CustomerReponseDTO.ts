import { CustomerDTO } from "./CustomerDTO";

export class CustomerResponseDTO extends CustomerDTO{

    constructor(id: string, name: String, contact: String)
    {
        super();
        this._id = id;
        this.name = name;
        this.contact = contact;
    }

}