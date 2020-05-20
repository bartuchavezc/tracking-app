export class CustomerUpdateCommand {

    readonly aggregateId: string;
    readonly name: String;
    readonly contact: String;
    constructor(
        aggregateId: string,
        { name, contact }: { name?: String, contact?: String }
    ) {
        this.aggregateId = aggregateId;

        if (name) {
            this.name = name
        }

        if (contact) {
            this.contact = contact
        }
        
    }

}