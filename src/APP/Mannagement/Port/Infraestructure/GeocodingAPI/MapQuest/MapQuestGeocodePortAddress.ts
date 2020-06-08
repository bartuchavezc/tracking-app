import axios from 'axios'
import { Injectable } from '@nestjs/common';
import { GeocodePortAddress } from '../GeocodePortAddress';
import { APIResultModel } from '../APIResultModel';

@Injectable()
export class MapQuestGeocodePortAddress implements GeocodePortAddress {

    public geocode(address: String) {
        return this._geocodinService(address);
    }

    private _geocodinService(address: String): Promise<APIResultModel[]> {
        return new Promise(async (resolve, reject) => {

            await axios.get(`${process.env.MAP_QUEST_URL}`, {
                params: { key: process.env.MAP_QUEST_KEY, location: address }
            })
                .then(result => {
                    result.data.info.statuscode == 0
                        ? resolve(this.parseAPIResults(result.data.results[0].locations))
                        : resolve(new Array<APIResultModel>());

                })
                .catch(error => {
                    reject(error);
                })
        })

    }

    private parseAPIResults(results: Array<any>) {
        return results.map(result =>
            new APIResultModel(
                result.adminArea1, result.adminArea3, result.adminArea5,
                { lat: result.latLng.lat, lng: result.latLng.lng }
            )
        )
    }

    private normalizeAddress(addres: String) {
        return addres.replace(/\s/g, "+");
    }

}