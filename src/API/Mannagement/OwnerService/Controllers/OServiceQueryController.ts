import { Controller, Get } from "@nestjs/common";
import { WebController } from "../../Shared/application/nest/WebController";
import { QueryBus } from "@nestjs/cqrs";
import { NestOServiceAllQuery } from "../Sources/Query/NestOServicesAllQuery";

@Controller("services")
export class OServiceQueryController extends WebController {

    constructor(
        private queryBus: QueryBus
    ){
        super();
    }

    @Get()
    __invoke(){
        return this.searchServices();
    }
    
    async searchServices(){
        return await this.queryBus.execute(new NestOServiceAllQuery())
    }

}