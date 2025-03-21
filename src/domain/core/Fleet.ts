import { VehicleHasAlreadyBeenRegisteredException } from "../exceptions/VehicleHasAlreadyBeenRegisteredException";
import { Entity } from "./Entity";
import { Vehicle } from "./Vehicle";

export class Fleet extends Entity {
    private vehicles: Vehicle[] = [];

    private userId: string;

    constructor(userId: string, id?: string) {
        super(id);
        this.userId = userId;
    }

    public addVehicle(vehicle: Vehicle): void {
        if (this.getVehicleByNumberPlate(vehicle.getPlateNumber())) {
            throw new VehicleHasAlreadyBeenRegisteredException('Vehicle has already been registered in your fleet');
        }
        this.vehicles.push(vehicle);
    }

    public getUserId(): string {
        return this.userId;
    }

    public getVehicles(): Vehicle[] {
        return this.vehicles;
    }

    public getVehicleByNumberPlate(numberPlate: string): Vehicle | null {
        return this.vehicles.find(vehicle => vehicle.getPlateNumber() === numberPlate) || null;
    }

    public static create(id: string, userId: string, vehicles: Record<string, any>[]): Fleet {
        const fleet = new Fleet(userId, id);
        if (vehicles) {
            vehicles.forEach(vehicle => fleet.addVehicle(Vehicle.create(vehicle.plateNumber, vehicle.location, vehicle.id)));
        }
        return fleet;
    }
}