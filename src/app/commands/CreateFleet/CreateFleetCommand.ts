import { Command } from "../../../domain/Command";

export class CreateFleetCommand extends Command {
    constructor(private readonly userId: string) {
        super();
    }

    public getUserId(): string {
        return this.userId;
    }
}