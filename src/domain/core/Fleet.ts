import { Entity } from "./Entity";
import { Vehicle } from "./Vehicle";

export class Fleet extends Entity {
    private vehicles: Map<string, Vehicle> = new Map();

    public addVehicle(vehicle: Vehicle): void {
        this.vehicles.set(vehicle.getId(), vehicle);
    }

    public getVehicles(): Map<string, Vehicle> {
        return this.vehicles;
    }

    public getVehicleByNumberPlate(numberPlate: string): Vehicle | null {
        return Array.from(this.vehicles.values()).find(vehicle => vehicle.getPlateNumber() === numberPlate) || null;
    }
}