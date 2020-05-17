import { TocCreationService } from "./Create/TocCreationService";
import { TocUpdateService } from "./Update/TocUpdateService";
import { SearchTocsService } from "./Search/SearchTocsService";
import { SearchTocsByCriteriaService } from "./Search/SearchTocsByCriteriaService";

export const TocServicesProvider = [
    {
        provide: "TocCreationService",
        useClass: TocCreationService
    },
    {
        provide: "TocUpdateService",
        useClass: TocUpdateService
    },
    {
        provide: "SearchTocsService",
        useClass: SearchTocsService
    },
    {
        provide: "SearchTocsByCriteriaService",
        useClass: SearchTocsByCriteriaService
    }
]