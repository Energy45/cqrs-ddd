import { Entity } from "../core/Entity";

export interface IRepository<T extends Entity> {
    save(entity: T): Promise<void>;
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    delete(entity: T): Promise<void>;
}