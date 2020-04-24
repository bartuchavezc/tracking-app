import { ICommand } from "@nestjs/cqrs";
import { OServiceUpdateCommand } from "src/APP/Mannagement/OwnerService/Application/Command/OServiceUpdateCommand";

export class NestOServiceUpdateCommand extends OServiceUpdateCommand implements ICommand {

    constructor(
        readonly id: string,
        readonly name: String
    ){ super(); }

}