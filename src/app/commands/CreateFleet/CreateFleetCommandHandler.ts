import { Fleet } from "../../../domain/core/Fleet";
import { User } from "../../../domain/core/User";
import { type ICommandHandler } from "../../../domain/interfaces/ICommandHandler";
import { CreateFleetCommand } from "./CreateFleetCommand";
import type { IFleetRepository } from "../../../domain/repository/IFleetRepository";
import type { IUserRepository } from "../../../domain/repository/IUserRepository";

export class CreateFleetCommandHandler implements ICommandHandler<CreateFleetCommand, Fleet> {
    constructor(private readonly userRepository: IUserRepository, private readonly fleetRepository: IFleetRepository) {}

    execute(command: CreateFleetCommand) {
        const user = this.userRepository.findById(command.getUserId());
        if (!user) {
            throw new Error("User not found");
        }
        const fleet = new Fleet();
        user.setFleet(fleet);
        this.userRepository.save(user);
        this.fleetRepository.save(fleet);
        return fleet;
    }
}