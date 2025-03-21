import { Vehicle } from "../../../domain/core/Vehicle";
import { FleetNotFoundException } from "../../../domain/exceptions/FleetNotFoundException";
import { VehicleHasAlreadyBeenRegisteredException } from "../../../domain/exceptions/VehicleHasAlreadyBeenRegisteredException";
import { ICommandHandler } from "../../../domain/interfaces/ICommandHandler";
import type { IFleetRepository } from "../../../domain/repository/IFleetRepository";
import type { RegisterVehicleCommand } from "./RegisterVehicleCommand";

export class RegisterVehicleCommandHandler implements ICommandHandler<RegisterVehicleCommand, void> {
    public constructor(private readonly fleetRepository: IFleetRepository) {}

    async execute(command: RegisterVehicleCommand): Promise<void> {
        const vehicle = new Vehicle(command.getPlateNumber());
        const fleet = await this.fleetRepository.findById(command.getFleetId());
        if (!fleet) {
            throw new FleetNotFoundException('Fleet not found');
        }
        
        fleet.addVehicle(vehicle);
        await this.fleetRepository.save(fleet);
        
    }
}