import { OServiceCrationService } from "./Create/OServiceCreationService";
import { OServiceUpdateService } from "./Update/OServiceUpdateService";
import { SearchOServices } from "./Search/SearchOServices";

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
    }
]