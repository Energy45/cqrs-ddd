import { Entity } from "./Entity";
import { Location } from "./Location";

export class Vehicle extends Entity {
    private location: Location;
    private plateNumber: string;

    public constructor(plateNumber: string, id?: string) {
        super(id);
        this.plateNumber = plateNumber;
        this.location = new Location(0, 0, 0);
    }

    public getPlateNumber(): string {
        return this.plateNumber;
    }

    public getLocation(): Location {
        return this.location;
    }

    public park(location: Location): void {
        if (this.location.equals(location)) {
            throw new Error("Vehicle is already parked at this location");
        }
        this.location = location;
    }
}
