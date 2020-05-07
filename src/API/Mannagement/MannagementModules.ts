import { CustomerModule } from "./Customer/Customer.module";
import { OwnerServiceModule } from "./OwnerService/OwnerService.module";
import { TypeOfCargoModule } from "./TypesOfCargo/TypeOfCargo.module";

export const MannagementModules = [
    CustomerModule,
    OwnerServiceModule,
    TypeOfCargoModule
]