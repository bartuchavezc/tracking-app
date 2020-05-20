import { NestCustomerCreateCommandHanlder } from "./NestCustomerCreateCommandHandler";
import { NestCustomerUpdateCommandHanlder } from "./NestCustomerUpdateCommandHandler";

export const CustomerCommandHandlerProviders = [
    NestCustomerCreateCommandHanlder,
    NestCustomerUpdateCommandHanlder
]