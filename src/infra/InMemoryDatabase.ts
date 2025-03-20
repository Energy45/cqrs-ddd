import type { User } from "../domain/core/User";

export class InMemoryDatabase {
    public users: User[] = [];
}