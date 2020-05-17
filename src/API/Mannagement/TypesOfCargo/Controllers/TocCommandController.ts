import { Controller, Post, Body, Res, Inject, Put, Param, Get } from "@nestjs/common";
import { WebController } from "../../Shared/application/nest/WebController";
import { TocCreateValidationObject } from "../Sources/Validation/TocCreateValidationObject";
import { CommandBus } from "@nestjs/cqrs";
import { NestTocCreateCommand } from "../Sources/Command/NestTocCreateCommand";
import { webroutes } from "../../Shared/application/webroutes";
import { TocUpdateValidationObject } from "../Sources/Validation/TocUpdateValidationObject";
import { NestTocUpdateCommand } from "../Sources/Command/NestTocUpdateCommand";

//Toc => Type Of Cargo

@Controller(`${webroutes.MannagementModuleRoutePrefix}/type-of-cargo`)
export class TocComandController extends WebController {

    constructor(
        private readonly commandBus: CommandBus
    ) {
        super();
    }

    @Post()
    __create(@Body() toc: TocCreateValidationObject, @Res() response){
        this.response = response;
        this.create(toc);
    }

    @Put(":id")
    __update(@Param("id") id: string,@Body() toc: TocUpdateValidationObject, @Res() response){
        this.response = response;
        this.update(id, toc);
    }
    
    async update(id: string, toc: TocUpdateValidationObject){
        await this.commandBus.execute(new NestTocUpdateCommand(id ,toc.cargo))
            .then(result => {
                this.resposneWithData(result);
            })
            .catch(err => {
                this.responseWithError(err);
            })
    }

    async create(toc: TocCreateValidationObject) {
        await this.commandBus.execute(new NestTocCreateCommand(toc.cargo))
            .then(result => {
                this.resposneWithData(result);
            })
            .catch(err => {
                this.responseWithError(err);
            })
    }

}