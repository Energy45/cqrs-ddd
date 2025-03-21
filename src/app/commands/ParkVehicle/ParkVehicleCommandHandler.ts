import { ParkVehicleCommand } from "./ParkVehicleCommand";
import { type ICommandHandler } from "../../../domain/interfaces/ICommandHandler";
import { IFleetRepository } from "../../../domain/repository/IFleetRepository";
import { Location } from "../../../domain/core/Location";

export class ParkVehicleCommandHandler implements ICommandHandler<ParkVehicleCommand, void> {
    constructor(private readonly fleetRepository: IFleetRepository) {}

    async execute(command: ParkVehicleCommand): Promise<void> {
        const fleet = await this.fleetRepository.findById(command.getFleetId());
        if (!fleet) {
            throw new Error("Fleet not found");
        }
        const vehicle = fleet.getVehicleByNumberPlate(command.getVehicleNumberPlate());
        if (!vehicle) {
            throw new Error("Vehicle not found");
        }
        vehicle.park(new Location(command.getLatitude(), command.getLongitude(), command.getAltitude()));
        this.fleetRepository.save(fleet);
    }
}