import { User } from "../../../domain/core/User";
import { type ICommandHandler } from "../../../domain/interfaces/ICommandHandler";
import { type IRepository } from "../../../domain/interfaces/IRepository";
import { CreateUserCommand } from "./CreateUserCommand";

export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand, User> {
    constructor(private readonly userRepository: IRepository<User>) {}

    execute(command: CreateUserCommand) {
        const user = new User();
        this.userRepository.save(user);
        return user;
    }
}