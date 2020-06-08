import { SavePortDomainService } from "./SavePortDomainServcie";

export const PortSaveServiceProvider = [
    {
        provide: "PortSaveServiceProvider",
        useClass: SavePortDomainService
    }
]