import { Controller, Get } from "@nestjs/common";
import { WebController } from "../../Shared/application/nest/WebController";
import { webroutes } from "../../Shared/application/webroutes";
import { QueryBus } from "@nestjs/cqrs";
import { NestTocsQuery } from "../Sources/Query/NestTocsQuery";

@Controller(`${webroutes.MannagementModuleRoutePrefix}/type-of-cargo`)
export class TocQueryController extends WebController {

    constructor(
        private readonly queryBus: QueryBus    
    ) {
        super()
    }

    @Get()
    __invoke(){
        return this.queryBus.execute(new NestTocsQuery())
    }

}