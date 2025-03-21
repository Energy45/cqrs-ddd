import { Fleet } from "../../../domain/core/Fleet";
import { type ICommandHandler } from "../../../domain/interfaces/ICommandHandler";
import { CreateFleetCommand } from "./CreateFleetCommand";
import type { IFleetRepository } from "../../../domain/repository/IFleetRepository";

export class CreateFleetCommandHandler implements ICommandHandler<CreateFleetCommand, Fleet> {
    constructor(private readonly fleetRepository: IFleetRepository) {}

    async execute(command: CreateFleetCommand): Promise<Fleet> {
        const fleet = new Fleet(command.getUserId());
        await this.fleetRepository.save(fleet);
        return fleet;
    }
}