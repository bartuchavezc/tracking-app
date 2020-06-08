import { MapQuestGeocodePortAddress } from '../../../../../APP/Mannagement/Port/Infraestructure/GeocodingAPI/MapQuest/MapQuestGeocodePortAddress';
import { config } from 'dotenv'
import { GeocodePortAddress } from 'src/APP/Mannagement/Port/Infraestructure/GeocodingAPI/GeocodePortAddress';

config();

describe("GeocodePortAddress", () => {

    const locations = {
        location1: {
            address: "Gorostiaga+5297,+La+Matanza,+Buenos+Aires",
            lat: -34.848655,
            lng: -58.660202
        },
        location2: {
            address: ""
        }
    }

    let geocodeService: GeocodePortAddress;

    describe("geocode", () => {

        beforeEach(() => {
            geocodeService = new MapQuestGeocodePortAddress()
        })

        test("geocode addres from locations, location1", async () => {
            let location = await geocodeService.geocode(locations.location1.address)
                .then(results => results.find(result => { return result.location.lat == locations.location1.lat }));

            expect(location.location.lat).toEqual(locations.location1.lat)

        })

        test("geocode addres from locations, location2", async () => {
            await geocodeService.geocode(locations.location2.address)
                .then(result => {
                    expect(result.length).toEqual(0)
                }).catch(err => console.error(err))

        })
    })

})