import { Port } from "./Port";

export interface PortReadRepository {

    matchAddress(address: String): Promise<any[]>;
    
    /**
     * 
     * @param location {lat: number, lng: number}
     * 
     * @returns true if exist some port whit this exact location otherwise this return false  
     */
    compareLocation(location: { lat: number, lng: number }): Promise<boolean>
}