export class MaxLengthViolation extends Error {

    constructor(value: String, length: number) {
        super(`${value} lentgh should be minor than ${length}`)
    }

}