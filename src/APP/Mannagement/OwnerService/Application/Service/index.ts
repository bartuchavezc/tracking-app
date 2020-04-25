import { OServiceCrationService } from "./Create/OServiceCreationService";
import { OServiceUpdateService } from "./Update/OServiceUpdateService";
import { SearchOServices } from "./Search/SearchOServices";
import { SearchOServiceByCriteria } from "./Search/SearchOServiceByCriteria";

export const OServiceServicesProvider = [
    {
        provide: "OServiceCreationService",
        useClass: OServiceCrationService
    },
    {
        provide: "OServiceUpdateService",
        useClass: OServiceUpdateService
    },
    {
        provide: "OServiceSearchService",
        useClass: SearchOServices
    },
    {
        provide: "OServiceSearchByCriteriaService",
        useClass: SearchOServiceByCriteria
    }
]