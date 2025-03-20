import type { User } from "../domain/core/User";
import type { IUserRepository } from "../domain/repository/IUserRepository";

export class UserInMemoryRepository implements IUserRepository {
    findByFleetId(fleetId: string): User | null {
        return this.users.get(fleetId) || null;
    }

    private users: Map<string, User> = new Map();

    save(entity: User): void {
        this.users.set(entity.getId(), entity);
        console.log('saving user', entity);
    }

    findById(id: string): User | null {
        return this.users.get(id) || null;
    }

    findAll(): User[] {
        return Array.from(this.users.values());
    }
    
    delete(entity: User): void {
        this.users.delete(entity.getId());
    }
}