import { Injectable, Inject } from "@nestjs/common";
import { OwnerService } from "../../../Domain/OwnerService";
import { Uuid } from "src/APP/Shared/Domain/ValueObjects/Uuid";
import { OServiceReadRepository } from "../../../Domain/Repository/OServiceReadRepository";

@Injectable()
export class SearchOServices {

    constructor(
        @Inject("OServiceReadRepository") private readonly repository: OServiceReadRepository
    ) { }

    async search() {
        let services = await this.repository
            .getAll()
            .then(result => result)
            .catch(err => { throw err })

        return services.map(service => {
            return new OwnerService(new Uuid(service._id), service.aggregate.payload.name);
        } );
    }

}