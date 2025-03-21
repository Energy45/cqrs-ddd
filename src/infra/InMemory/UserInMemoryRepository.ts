import type { User } from "../../domain/core/User";
import type { IUserRepository } from "../../domain/repository/IUserRepository";

export class UserInMemoryRepository implements IUserRepository {
    async findByFleetId(fleetId: string): Promise<User | null> {
        return this.users.get(fleetId) || null;
    }

    private users: Map<string, User> = new Map();

    async save(entity: User): Promise<void> {
        this.users.set(entity.getId(), entity);
        console.log('saving user', entity);
    }

    async findById(id: string): Promise<User | null> {
        return this.users.get(id) || null;
    }

    async findAll(): Promise<User[]> {
        return Array.from(this.users.values());
    }
    
    async delete(entity: User): Promise<void> {
        this.users.delete(entity.getId());
    }
}