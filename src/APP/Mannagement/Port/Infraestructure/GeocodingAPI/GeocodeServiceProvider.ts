import { MapQuestGeocodePortAddress } from "./MapQuest/MapQuestGeocodePortAddress";

export const GeocodeServiceProvider = [
    {
        provide: "GeocodeService",
        useClass: MapQuestGeocodePortAddress
    }
]