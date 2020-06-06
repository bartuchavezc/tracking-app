import axios from 'axios'
import { Injectable } from '@nestjs/common';
import { LocationNotSpecified } from './LocaitonNotSpecified';

@Injectable()
export class GeocodePortAddress {

    public __invoke(address: String) {
        return this.geocode(address);
    }

    private geocode(address: String) {
        return new Promise(async (resolve, reject) => {
            await axios
                .get(`${process.env.MAP_QUEST_URL}?location=${this.normalizeAddress(address)}`, {
                    params: { key: process.env.MAP_QUEST_KEY, location: address }
                })
                .then(result => {
                    if (result.data.info.statuscode == 0) {
                        resolve(this.parseAPIResults(result.data.results[0].locations));
                    } else {
                        reject(new LocationNotSpecified(result.data.info.messages[0]));
                    }
                })
                .catch(error => {
                    reject(error);
                })
        })

    }

    private parseAPIResults(results: Array<any>) {
        return results.map(result => {
            return {
                country: result.adminArea1,
                state: result.adminArea3,
                city: result.adminArea5,
                neighborhood: result.adminArea6,
                location: {
                    lat: result.latLng.lat,
                    long: result.latLng.lng
                }
            }
        })
    }

    private normalizeAddress(addres: String) {
        return addres.replace(/\s/g, "+");
    }

}