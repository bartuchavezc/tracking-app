export class CustomerUpdateCommand {
    constructor(
        readonly id: string,
        readonly name: String,
        readonly contact: String
    ){}
}