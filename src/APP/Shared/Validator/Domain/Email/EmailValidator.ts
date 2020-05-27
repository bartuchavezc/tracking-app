export interface EmailValidator {
    validate(email: String): Promise<any>;
}