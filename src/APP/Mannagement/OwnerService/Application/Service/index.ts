import { OServiceCrationService } from "./Create/OServiceCreationService";

export const OServiceServicesProvider = [
    {
        provide: "OServiceCreationService",
        useClass: OServiceCrationService
    }
]