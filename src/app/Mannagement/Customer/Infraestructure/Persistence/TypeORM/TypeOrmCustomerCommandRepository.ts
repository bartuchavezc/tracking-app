import { CustomerCommandRepository } from "../../../Domain/repository/CustomerCommandRepository";

export class TypeOrmCustomerCommandRepository implements CustomerCommandRepository{
    
    save({id, name, contact}){

        console.log(`customer creado: ${id} - ${name} - ${contact}`);

        return new Promise( (resolve, reject) => {
            resolve();
        });

    }

    delete(id: string){
        return `customer ${id} deleted`;
    }

}