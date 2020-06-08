import { config } from "dotenv";
import { MapQuestGeocodePortAddress } from "../../../../../APP/Mannagement/Port/Infraestructure/GeocodingAPI/MapQuest/MapQuestGeocodePortAddress";
import { ConsoleLogger } from "../../../../../APP/Shared/Logger/ConsoleLogger";
import { FromAddressPortFinder } from "../../../../../APP/Mannagement/Port/Application/Service/Find/FromAddressPortFinder";

config();

describe("PortFromAddressFinder", () => {
    const location = {
        address: "Gorostiaga+5297,+La+Matanza,+Buenos+Aires",
        lat: -34.848655,
        lng: -58.660202
    }

    let portFinder: FromAddressPortFinder;

    beforeEach(() => {
        portFinder = new FromAddressPortFinder(new MapQuestGeocodePortAddress(), new ConsoleLogger())
    })

    test("find port from address", async () => {
        let searchResult = await portFinder.find(location.address)
            .then(results => results["Geocode API Results"].find(result => result.location))

        expect(searchResult.location.lat).toEqual(location.lat)
    })

})