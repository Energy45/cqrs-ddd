import { Command } from "../../../domain/Command";

export class ParkVehicleCommand extends Command {
    constructor(
        private readonly fleetId: string,
        private readonly vehicleNumberPlate: string,
        private readonly latitude: number,
        private readonly longitude: number,
        private readonly altitude: number
    ) {
        super();
    }

    public getFleetId(): string {
        return this.fleetId;
    }

    public getVehicleNumberPlate(): string {
        return this.vehicleNumberPlate;
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
}

