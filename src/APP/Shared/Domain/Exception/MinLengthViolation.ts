export class MinLengthViolation extends Error {

    constructor(value: String, length: number) {
        super(`${value}, length should ben mayor than ${length}`)
    }

}