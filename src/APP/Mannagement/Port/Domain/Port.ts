import { Uuid } from "src/APP/Shared/ValueObjects/Uuid";

export class Port {

    private _aggregateId: Uuid;
    readonly country: String;
    readonly state: String;
    readonly city: String;
    readonly location: { lat: number, lng: number };
    readonly address: String

    constructor(
        {
            country, state, city, address, location
        }: {
            country?: String, state?: String, city?: String, address?: String, location: { lat: number, lng: number }
        }
    ) {
        this.location = location;

        if (country) this.country = country
        if (state) this.state = state;
        if (city) this.city = city
        if (address) this.address = address

    }

    
    public _setAaggregateId( id: Uuid) {
        this._aggregateId = id;
    }

    public _getAggregateId() {
        return this._aggregateId;
    }
    

    toPrimitives() {
        return {
            country: this.country,
            state: this.state,
            city: this.city,
            address: this.address,
            location: this.location
        }
    }


}