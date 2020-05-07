import { TypeOfCargo } from "./TypeOfCargo";

export interface TocRepository {

    add(toc: TypeOfCargo, eventName: String);

    getAll();

}