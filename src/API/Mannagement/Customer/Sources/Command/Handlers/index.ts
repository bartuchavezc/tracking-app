import { CustomerCreateCommandHanlder } from "./CustomerCreateCommandHandler";
import { CustomerUpdateCommandHanlder } from "./CustomerUpdateCommandHanlder";

export const CustomerCommandHandlerProviders = [
    CustomerCreateCommandHanlder,
    CustomerUpdateCommandHanlder,
]