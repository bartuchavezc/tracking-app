export class CustomerChangedContactEvent{

    constructor (
        private readonly id: String,
        private readonly contact: String
    ){}

}