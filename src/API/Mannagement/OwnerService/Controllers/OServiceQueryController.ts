import { Controller, Get, Param, Req } from "@nestjs/common";
import { WebController } from "../../Shared/application/nest/WebController";
import { QueryBus } from "@nestjs/cqrs";
import { NestOServiceAllQuery } from "../Sources/Query/NestOServicesAllQuery";
import { NestOServiceCriteriaQuery } from "../Sources/Query/NestOServiceCriteriaQuery";
import { webroutes } from "../../Shared/application/webroutes";

@Controller(`${webroutes.MannagementModuleRoutePrefix}services`)
export class OServiceQueryController extends WebController {

    constructor(
        private queryBus: QueryBus
    ) {
        super();
    }

    @Get()
    __invoke() {
        return this.searchServices();
    }

    @Get(":id")
    getByCriteria(@Param("id") id, @Req() { body }) {
        return this.searchByCrteria(id, body);

    }

    async searchByCrteria(id: string, body) {
        const query = new NestOServiceCriteriaQuery();
            query.setId(id)

            if(body.name){
                query.setName(body.name);   
            }

            if(body.text){
                query.setText(body.text);
            }
            
        return await this.queryBus.execute(query);
    }

    async searchServices() {
        return await this.queryBus.execute(new NestOServiceAllQuery());
    }

}