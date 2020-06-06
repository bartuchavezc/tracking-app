export interface MaxLengthValidation {
    validate(value: String, maxLength: number): Promise<any>
}