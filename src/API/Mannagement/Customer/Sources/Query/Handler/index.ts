import { NestAllCustomerQueryHandler } from "./NestAllCustomerQueryHanlder";
import { NestByCriteriaCustomerQueryHandler } from "./NestByCriteriaCustomerQueryHandler";
import { NestOneCustomerQueryHandler } from "./NestOneCustomerQueryHandler";

export const CustomerQueryHandlerProviders = [
    NestAllCustomerQueryHandler,
    NestByCriteriaCustomerQueryHandler,
    NestOneCustomerQueryHandler
]