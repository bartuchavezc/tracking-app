export interface MinLengthValidation {
    validate(value: String, minLength: Number): Promise<any>
}