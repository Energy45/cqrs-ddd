import { Vehicle } from "../../../domain/core/Vehicle";
import { ICommandHandler } from "../../../domain/interfaces/ICommandHandler";
import type { IFleetRepository } from "../../../domain/repository/IFleetRepository";
import type { IUserRepository } from "../../../domain/repository/IUserRepository";
import type { RegisterVehicleCommand } from "./RegisterVehicleCommand";

export class RegisterVehicleCommandHandler implements ICommandHandler<RegisterVehicleCommand, void> {
    public constructor(private readonly fleetRepository: IFleetRepository, private readonly userRepository: IUserRepository) {}

    async execute(command: RegisterVehicleCommand): Promise<void> {
        const vehicle = new Vehicle(command.getPlateNumber());
        const fleet = await this.fleetRepository.findById(command.getFleetId());
        if (!fleet) {
            throw new Error('Fleet not found');
        }
        fleet.addVehicle(vehicle);
        this.fleetRepository.save(fleet);
    }
}