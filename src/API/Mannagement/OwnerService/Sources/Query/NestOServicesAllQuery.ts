import { IQuery } from "@nestjs/cqrs";
import { OServiceQuery } from "src/APP/Mannagement/OwnerService/Application/Query/OServiceQuery";

export class NestOServiceAllQuery extends OServiceQuery implements IQuery {

}