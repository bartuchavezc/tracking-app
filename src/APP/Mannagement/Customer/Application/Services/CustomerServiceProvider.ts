import { CustomerCreationService } from "./Create/CustomerCreationService";
import { SearchCustomersService } from "./Search/SearchCustomerService";
import { SearchCustomerByCriteriaService } from "./Search/SearchCustomerByCriteriaService";
import { CustomerUpdateService } from "./Update/CustomerUpdateService";
import { SearchOneCustomer } from "./Search/SearchOneCustomer";

export const CustomerServiceProvider = [
    {
        provide: "CustomerCreator",
        useClass: CustomerCreationService
    },
    {
        provide: "CustomerUpdateService",
        useClass: CustomerUpdateService
    },
    {
        provide: "SearchAllCustomersService",
        useClass: SearchCustomersService
    },
    {
        provide: "CustomerByCriteriaSearcher",
        useClass: SearchCustomerByCriteriaService
    },
    {
        provide: "OneCustomerSearch",
        useClass: SearchOneCustomer
    }
    
]