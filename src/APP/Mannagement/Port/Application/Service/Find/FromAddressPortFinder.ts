import { Inject } from "@nestjs/common";
import { GeocodePortAddress } from "../../../Infraestructure/GeocodingAPI/GeocodePortAddress";
import { Logger } from "src/APP/Shared/Logger/Logger";
import { Port } from "../../../Domain/Port";

export class FromAddressPortFinder {

    constructor(
        @Inject("GeocodeService") private readonly geocodeService: GeocodePortAddress,
        @Inject("LoggerProvider") private readonly logger: Logger
    ) { }

    public async find(address: String) {
        const ports = {
            GeocodeResults: [],
            DBResults: []
        };

        await this.findInGeocodeService(address)
            .then(results =>
                ports.GeocodeResults = results.map(result =>
                    new Port({ country: result.country, state: result.state, city: result.city, address, location: result.location })
                ))
            .catch(error => this.logger.error(error))

        return ports;
    }

    private findInGeocodeService(address: String) {
        return this.geocodeService.geocode(address);
    }


}