import { VehicleHasAlreadyBeenParkedHere } from "../exceptions/VehicleHasAlreadyBeenParkedHere";
import { Entity } from "./Entity";
import { Location } from "./Location";

export class Vehicle extends Entity {
    private location: Location;
    private plateNumber: string;

    public constructor(plateNumber: string, location?: Location, id?: string) {
        super(id);
        this.plateNumber = plateNumber;
        this.location = location ?? new Location(0, 0, 0);
    }

    public getPlateNumber(): string {
        return this.plateNumber;
    }

    public getLocation(): Location {
        return this.location;
    }

    public park(location: Location): void {
        if (this.location.equals(location)) {
            throw new VehicleHasAlreadyBeenParkedHere("Vehicle is already parked at this location");
        }
        this.location = location;
    }

    public static create(plateNumber: string, location: Record<string, any>, id: string): Vehicle {
        return new Vehicle(plateNumber, new Location(location.latitude, location.longitude, location.altitude), id);
    }
}
