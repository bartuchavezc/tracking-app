import { Uuid } from "src/APP/Shared/ValueObjects/Uuid";

export class OServiceUpdateCommand {
    public readonly id: Uuid;
    public readonly name: String;
}