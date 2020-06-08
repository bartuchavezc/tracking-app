export class Port {

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

    toPrimitives() {
        return {
            country: this.country,
            city: this.city,
            address: this.address,
            location: this.location
        }
    }

}