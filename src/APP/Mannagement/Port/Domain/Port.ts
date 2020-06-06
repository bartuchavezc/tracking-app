export class Port {

    readonly country: String;
    readonly city: String;
    readonly location: { lat: number, long: number, address: String };
    readonly name;

    constructor(
        {
            country, city, location, name
        }: {
            country?: String, city?: String, location: { lat: number, long: number, address: String }, name?: String
        }
    ) {
        this.location = location;

        if (country) this.country = country
        if (city) this.city = city
        if (name) this.name = name
    }

    toPrimitives(){
        return {
            country: this.country,
            city: this.city,
            location: this.location,
            name: this.name
        }
    }

}