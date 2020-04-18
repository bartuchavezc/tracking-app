import { CustomerCreationService } from "./Create/CustomerCreationService";
import { CustomerChangeNameService } from "./Update/CustomerChangeNameService";
import { CustomerChangeContactService } from "./Update/CustomerChangeContactService";
import { SearchCustomersService } from "./Search/SearchCustomerService";
import { SearchCustomerByCriteriaService } from "./Search/SearchCustomerByCriteriaService";

export const CustomerServiceProvider = [
    {
        provide: "CustomerCreator",
        useClass: CustomerCreationService
    },
    {
        provide: "CustomerChangeNameService",
        useClass: CustomerChangeNameService
    },
    {
        provide: "CustomerChangeContactService",
        useClass: CustomerChangeContactService
    },
    {
        provide: "SearchAllCustomersService",
        useClass: SearchCustomersService
    },
    {
        provide: "GetOneCustomerService",
        useClass: SearchCustomerByCriteriaService
    },
    
]