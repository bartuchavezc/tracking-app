import { OServiceCrationService } from "./Create/OServiceCreationService";
import { OServiceUpdateService } from "./Update/OServiceUpdateService";

export const OServiceServicesProvider = [
    {
        provide: "OServiceCreationService",
        useClass: OServiceCrationService
    },
    {
        provide: "OServiceUpdateService",
        useClass: OServiceUpdateService
    }
]