import { IQuery } from "@nestjs/cqrs";

export class PortsNestQuery implements IQuery {
    constructor(readonly address: String) { }
}