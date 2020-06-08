import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { PortsNestQuery } from "../PortsNestQuery";
import { Inject } from "@nestjs/common";
import { FromAddressPortFinder } from "src/APP/Mannagement/Port/Application/Service/Find/FromAddressPortFinder";

@QueryHandler(PortsNestQuery)
export class PortNestQueryHandler implements IQueryHandler<PortsNestQuery> {

    constructor(
        @Inject("PortFindService") private readonly finder: FromAddressPortFinder
    ) { }

    execute(query: PortsNestQuery){
        return this.finder.find(query.address);
    }

}