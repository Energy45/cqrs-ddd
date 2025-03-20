export class Location {
    private latitude: number;
    private longitude: number;
    private altitude: number;

    public constructor(latitude: number, longitude: number, altitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
    }
    
    public getLatitude(): number {
        return this.latitude;
    }

    public getLongitude(): number {
        return this.longitude;
    }

    public getAltitude(): number {
        return this.altitude;
    }

    public equals(location: Location): boolean {
        return this.latitude === location.getLatitude() && this.longitude === location.getLongitude() && this.altitude === location.getAltitude();
    }
}