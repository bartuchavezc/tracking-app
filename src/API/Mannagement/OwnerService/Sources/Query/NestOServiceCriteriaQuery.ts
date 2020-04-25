import { OServiceQuery } from "src/APP/Mannagement/OwnerService/Application/Query/OServiceQuery";
import { IQuery } from "@nestjs/cqrs";

export class NestOServiceCriteriaQuery extends OServiceQuery implements IQuery {

    setId(id: string){
        this.id = id;
    }

    setName(name: String){
        this.name = name;
    }

    setText(text: String){
        this.text = text;
    }

}