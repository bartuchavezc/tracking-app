import { OneOServiceQuery } from "src/APP/Mannagement/OwnerService/Application/Query/OneOServiceQuery";

export class NestOneOServiceQuery extends OneOServiceQuery{

    constructor(agrgegateId: string){
        super(agrgegateId);
    }

}