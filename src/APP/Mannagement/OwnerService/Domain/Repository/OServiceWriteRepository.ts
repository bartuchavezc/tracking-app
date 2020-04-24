import { OServiceEvent } from "../../Infraestructure/Persistence/OServiceModel";

export interface OServiceWriteRepository {
    add(event: OServiceEvent): Promise<OServiceEvent>
}