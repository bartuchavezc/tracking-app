import { IQuery } from "@nestjs/cqrs";
import { OServiceAllQuery } from "src/APP/Mannagement/OwnerService/Application/Query/OServiceAllQuery";

export class NestOServiceAllQuery extends OServiceAllQuery implements IQuery {

}