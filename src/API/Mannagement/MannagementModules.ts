import { CustomerModule } from "./Customer/Customer.module";
import { OwnerServiceModule } from "./OwnerService/OwnerService.module";
import { TypeOfCargoModule } from "./TypesOfCargo/TypeOfCargo.module";
import { PortModule } from "./Port/Port.module";

export const MannagementModules = [
    CustomerModule,
    OwnerServiceModule,
    TypeOfCargoModule,
    PortModule
]