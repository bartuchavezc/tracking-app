import { NestAllCustomerQueryHandler } from "./NestAllCustomerQueryHanlder";
import { NestByCriteriaCustomerQueryHandler } from "./NestByCriteriaCustomerQueryHandler";

export const CustomerQueryHandlerProviders = [
    NestAllCustomerQueryHandler,
    NestByCriteriaCustomerQueryHandler,
]