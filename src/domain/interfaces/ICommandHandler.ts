import { type ICommand } from "./ICommand";

export interface ICommandHandler<T extends ICommand, TExecuteResult> {
    execute(command: T): Promise<TExecuteResult>;
}