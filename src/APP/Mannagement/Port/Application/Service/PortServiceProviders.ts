import { FromAddressPortFinder } from "./Find/FromAddressPortFinder";

export const PortServiceProviders = [
    {
        provide: "PortFindService",
        useClass: FromAddressPortFinder
    }
]