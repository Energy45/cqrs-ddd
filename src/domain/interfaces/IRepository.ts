import { Entity } from "../core/Entity";

export interface IRepository<T extends Entity> {
    save(entity: T): void;
    findById(id: string): T | null;
    findAll(): T[];
    delete(entity: T): void;
}