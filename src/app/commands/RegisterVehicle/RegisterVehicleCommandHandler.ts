import { Vehicle } from "../../../domain/core/Vehicle";
import type { IFleetRepository } from "../../../domain/repository/IFleetRepository";
import type { IUserRepository } from "../../../domain/repository/IUserRepository";
import type { RegisterVehicleCommand } from "./RegisterVehicleCommand";

export class RegisterVehicleCommandHandler  {
    public constructor(private readonly fleetRepository: IFleetRepository, private readonly userRepository: IUserRepository) {}

    public execute(command: RegisterVehicleCommand): void {
        const vehicle = new Vehicle(command.getPlateNumber());
        const fleet = this.fleetRepository.findById(command.getFleetId());
        if (!fleet) {
            throw new Error('Fleet not found');
        }
        fleet.addVehicle(vehicle);
        this.fleetRepository.save(fleet);
    }
}