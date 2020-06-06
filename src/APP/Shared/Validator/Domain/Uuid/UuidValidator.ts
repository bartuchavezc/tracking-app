export interface UuidValidator{

    validate(uuid: string): Promise<any>

}