export interface CustomerCommandRepository {

    save(vlue?: any): Promise<any>;

    delete(id: string): string;

}