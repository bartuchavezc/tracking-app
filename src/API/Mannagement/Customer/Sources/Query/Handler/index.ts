import { AllCustomerQueryHandler } from "./AllCustomerQueryHanlder";
import { OneCustomerQueryHandler } from "./OneCustomerQueryHandler";

export const CustomerQueryHandlerProviders = [
    AllCustomerQueryHandler,
    OneCustomerQueryHandler,
]