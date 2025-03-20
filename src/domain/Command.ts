import { randomUUID } from "node:crypto";
import { type ICommand } from "./interfaces/ICommand";

export abstract class Command implements ICommand {
    id: string;
    
    constructor() {
        this.id = randomUUID();
    }
}