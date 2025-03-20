import { randomUUID } from "node:crypto";

export abstract class Entity {
    protected id: string;

    constructor(_id?: string) {
        this.id = _id || randomUUID();
    }

    public getId(): string {
        return this.id;
    }

    public equals(entity: Entity): boolean {
        return entity === this || entity.id === this.id;
    }
}