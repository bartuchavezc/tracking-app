import { ICommand } from "@nestjs/cqrs";
import { OServiceUpdateCommand } from "src/APP/Mannagement/OwnerService/Application/Command/OServiceUpdateCommand";
import { Uuid } from "src/APP/Shared/ValueObjects/Uuid";

export class NestOServiceUpdateCommand extends OServiceUpdateCommand implements ICommand {

    constructor(
        readonly id: Uuid,
        readonly name: String
    ){ super(); }

}