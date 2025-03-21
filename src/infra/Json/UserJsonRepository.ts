import { User } from "../../domain/core/User";
import { IUserRepository } from "../../domain/repository/IUserRepository";
import { JsonDatabase } from "./JsonDatabase";

export class UserJsonRepository implements IUserRepository {
    private database: JsonDatabase<User[]>

    constructor(private readonly filename: string) {
        this.database = new JsonDatabase<User[]>(filename);
    }

    async save(user: User): Promise<void> {
        const dataRead = await this.database.loadDataFromDisk();
        dataRead.push(user);
        await this.database.saveDataToDisk(dataRead);
    }

    async findById(id: string): Promise<User | null> {
        const dataRead = await this.database.loadDataFromDisk();
        return dataRead.find(user => user.getId() === id) || null;
    }

    async findAll(): Promise<User[]> {
        return await this.database.loadDataFromDisk();
    }

    async delete(user: User): Promise<void> {
        const dataRead = await this.database.loadDataFromDisk();
        dataRead.splice(dataRead.indexOf(user), 1);
        await this.database.saveDataToDisk(dataRead);
    }

    async findByFleetId(fleetId: string): Promise<User | null> {
        const dataRead = await this.database.loadDataFromDisk();
        return dataRead.find(user => user.getFleet()?.getId() === fleetId) || null;
    }
} 