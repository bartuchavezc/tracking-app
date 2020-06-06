import { Controller, Post, Body, Res, Inject, Put, Param, Get } from "@nestjs/common";
import { WebController } from "../../Shared/application/nest/WebController";
import { CommandBus } from "@nestjs/cqrs";
import { NestTocCreateCommand } from "../Sources/Command/NestTocCreateCommand";
import { webroutes } from "../../Shared/application/webroutes";
import { NestTocUpdateCommand } from "../Sources/Command/NestTocUpdateCommand";
import { ValidationErrorList } from "src/APP/Shared/Validator/Domain/ValidationErrorList";
import { ValidationService } from "src/APP/Shared/Validator/Service/ValidationService";

//Toc => Type Of Cargo

@Controller(`${webroutes.MannagementModuleRoutePrefix}/type-of-cargo`)
export class TocComandController extends WebController {

    constructor(
        @Inject("ValidationService") private readonly validation: ValidationService,
        private readonly commandBus: CommandBus
    ) {
        super();
    }

    @Post()
    async create(@Body() { cargo }: { cargo: String }, @Res() response) {
        this.response = response;
        return this.validateRequest({ cargo })
            .then(result => result.length > 0 ? this.response400(`ValidationErrors: ${JSON.stringify(result)}`) : this._create(cargo))
    }

    @Put(":id")
    async update(@Param("id") aggregateId: string, @Body() { cargo }: { cargo: String }, @Res() response) {
        this.response = response;
        await this.validateRequest({ aggregateId, cargo })
            .then(result => result.length > 0 ? this.response400(`ValidationErrors: ${JSON.stringify(result)}`) : this._update(aggregateId, cargo));
    }

    async _update(id: string, cargo: String) {
        await this.commandBus.execute(new NestTocUpdateCommand(id, cargo))
            .then(result => {
                this.resposneWithData(result);
            })
            .catch(err => {
                this.responseWithError(err);
            })
    }

    async _create(cargo: String) {
        await this.commandBus.execute(new NestTocCreateCommand(cargo))
            .then(result => {
                this.resposneWithData(result);
            })
            .catch(err => {
                this.responseWithError(err);
            })
    }

    private async validateRequest({ aggregateId, cargo }: { aggregateId?: string, cargo: String }) {
        const constraint = new ValidationErrorList();

        if (aggregateId) await this.validation.isUuid(aggregateId).catch(error => constraint.push({ aggregateId: error.message }));

        if (cargo != undefined) await this.validation.minLengthMatch(cargo, 4).catch(error => constraint.push({ cargo: error.message }));
        await this.validation.isNotEmpty(cargo).catch(error => constraint.push({ cargo: error.message }));

        return constraint
    }

}