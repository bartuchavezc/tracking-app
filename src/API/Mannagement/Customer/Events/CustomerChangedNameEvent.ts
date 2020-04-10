export class CustomerChangedNameEvent {

    constructor(
        private readonly id: String,
        private readonly name: String
    ){}

}