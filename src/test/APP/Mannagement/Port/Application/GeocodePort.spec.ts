import { GeocodePortAddress } from '../../../../../APP/Mannagement/Port/Infraestructure/GeocodingAPI/GeocodePortAddress';
import { config } from 'dotenv'

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

    let geocodeService;

    describe("geocode", () => {

        beforeEach(() => {
            geocodeService = new GeocodePortAddress()
        })

        test("geocode addres from locations, location1", async () => {
            let location = await geocodeService.__invoke(locations.location1.address)
                .then(results => results.find(result => { return result.location.lat == locations.location1.lat }));

            expect(location.location.lat).toEqual(locations.location1.lat)

        })

        test("geocode addres from locations, location2", async () => {
            await geocodeService.__invoke(locations.location2.address)
                .then(result => {
                    expect(result.location.lat).toEqual(locations.location1.lat)
                })

        })
    })

})