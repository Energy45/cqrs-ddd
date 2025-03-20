import { Entity } from "./Entity";
import { Fleet } from "./Fleet";

export class User extends Entity {
    private fleet: Fleet;

    public setFleet(fleet: Fleet): void {
        this.fleet = fleet;
    }

    public getFleet(): Fleet {
        return this.fleet;
    }
}
