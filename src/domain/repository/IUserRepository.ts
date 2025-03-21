import type { User } from "../core/User";
import type { IRepository } from "../interfaces/IRepository";

export interface IUserRepository extends IRepository<User> {
    findByFleetId(fleetId: string): Promise<User | null>;
}
