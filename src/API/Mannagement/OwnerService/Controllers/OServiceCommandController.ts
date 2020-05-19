import { Controller, Post, Body, Put, Param, Res } from "@nestjs/common";
import { WebController } from "../../Shared/application/nest/WebController";
import { CommandBus } from "@nestjs/cqrs";
import { NestOServiceCreateCommand } from "../Sources/Command/NestOServiceCrateCommand";
import { OServiceValidationObject } from "../Sources/Validation/OServiceValidationObject";
import { NestOServiceUpdateCommand } from "../Sources/Command/NestOServiceUpdateCommand";
import { Uuid } from "src/APP/Shared/ValueObjects/Uuid";
import { webroutes } from "../../Shared/application/webroutes";

@Controller(`${webroutes.MannagementModuleRoutePrefix}/services`)
export class OwnerServiceCommandController extends WebController {

    constructor(
        private commandBus: CommandBus
    ) {
        super();
    }

    @Post()
    create(@Body() OService: OServiceValidationObject, @Res() response) {
        this.response = response;
        this.createOService(OService.name);
    }

    @Put(":id")
    update(@Param("id") aggregateId: string, @Body() OService: OServiceValidationObject, @Res() response) {
        this.response = response;
        this.updateOService(aggregateId, OService.name);
    }

    async createOService(serviceName) {
        await this.commandBus.execute(new NestOServiceCreateCommand(serviceName))
            .then(result => {
                this.resposneWithData(result);
            })
            .catch(error => {
                this.responseWithError(error)
            })
    }

    async updateOService(aggregateId: string, serviceName: String) {
        await this.commandBus.execute(new NestOServiceUpdateCommand(aggregateId, serviceName))
            .then(result => {
                this.resposneWithData(result);
            })
            .catch(error => {
                this.responseWithError(error)
            })
    }

}