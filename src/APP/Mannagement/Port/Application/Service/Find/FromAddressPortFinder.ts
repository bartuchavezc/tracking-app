import { Inject } from "@nestjs/common";
import { GeocodePortAddress } from "../../../Infraestructure/GeocodingAPI/GeocodePortAddress";
import { Logger } from "src/APP/Shared/Logger/Logger";
import { Port } from "../../../Domain/Port";
import { SavePortDomainService } from "../../../Domain/Services/Save/SavePortDomainServcie";
import { PortReadRepository } from "../../../Domain/PortReadRepository";

export class FromAddressPortFinder {

    constructor(
        @Inject("GeocodeService") private readonly geocodeService: GeocodePortAddress,
        @Inject("PortReadRepositoryProvider") private readonly readRepository: PortReadRepository,
        @Inject("LoggerProvider") private readonly logger: Logger,
        @Inject("PortSaveServiceProvider") private readonly saver: SavePortDomainService
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

        await this.findInDbService(address)
            .then(results =>
                ports.DBResults = results.map(result =>
                    new Port({ country: result.country, state: result.state, city: result.city, address, location: result.location })
                ))
            .catch(error => this.logger.error(error))

        return ports;
    }

    private findInGeocodeService(address: String) {
        return this.geocodeService.geocode(address);
    }

    private findInDbService(address: String) {
        return this.readRepository.matchAddress(address);
    }


}