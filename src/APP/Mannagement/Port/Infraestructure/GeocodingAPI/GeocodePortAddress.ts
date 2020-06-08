import { APIResultModel } from "./APIResultModel";

export interface GeocodePortAddress {

    geocode(address: String): Promise<APIResultModel[]>;

}