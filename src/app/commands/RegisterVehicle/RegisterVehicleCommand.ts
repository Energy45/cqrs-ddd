import { Command } from "../../../domain/Command";

export class RegisterVehicleCommand extends Command {
    public constructor(
        private readonly fleetId: string,
        private readonly plateNumber: string,
    ) {
        super();
    }

    public getPlateNumber(): string {
        return this.plateNumber;
    }

    public getFleetId(): string {
        return this.fleetId;
    }
}
