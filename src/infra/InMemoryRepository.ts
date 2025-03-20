import { Entity } from "../domain/core/Entity";
import { type IRepository } from "../domain/interfaces/IRepository";
import type { InMemoryDatabase } from "./InMemoryDatabase";

export class InMemoryRepository<T extends Entity> implements IRepository<T> {
    private entities: Map<string, T> = new Map();
    
    save(entity: T): void {
        this.entities.set(entity.getId(), entity);
        console.log('current entities', this.findAll());
    }

    findById(id: string): T | null {
        return this.entities.get(id) || null;
    }

    findAll(): T[] {
        return Array.from(this.entities.values());
    }
    
    delete(entity: T): void {
        this.entities.delete(entity.getId());
    }
}