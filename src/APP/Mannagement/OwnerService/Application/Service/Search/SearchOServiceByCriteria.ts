import { Injectable, Inject } from "@nestjs/common";
import { OServiceReadRepository } from "../../../Domain/Repository/OServiceReadRepository";
import { OwnerService } from "../../../Domain/OwnerService";
import { OServiceQuery } from "../../Query/OServiceQuery";
import { Uuid } from "src/APP/Shared/Domain/ValueObjects/Uuid";

@Injectable()
export class SearchOServiceByCriteria {

    constructor(
        @Inject("OServiceReadRepository") private readonly repository: OServiceReadRepository
    ) { }

    async searchByCriteria(query: OServiceQuery) {
        let services = await this.repository.getAll()
            .then(result => result)
            .catch(err => { throw err })
            
        return services.filter(service => {
            if (service._id == query.id) {
                return new OwnerService(new Uuid(service._id), service.aggregate.payload.name)
            }
        })
    }

}