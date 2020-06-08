export class APIResultModel {

 constructor(
        readonly country: String,
        readonly state: String,
        readonly city: String,
        readonly location: { lat: number, lng: number }
    ) {}

}