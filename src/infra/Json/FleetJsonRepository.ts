import { Fleet } from "../../domain/core/Fleet";
import { Vehicle } from "../../domain/core/Vehicle";
import { IFleetRepository } from "../../domain/repository/IFleetRepository";
import data from '../../fleet.json'
import { JsonDatabase } from "./JsonDatabase";

export class FleetJsonRepository implements IFleetRepository {
    private database: JsonDatabase<Fleet[]>

    constructor(private readonly filename: string) {
        this.database = new JsonDatabase<Fleet[]>(filename);
    }

    async save(fleet: Fleet): Promise<void> {
        const dataRead = await this.database.loadDataFromDisk();
        dataRead.push(fleet);
        await this.database.saveDataToDisk(dataRead);
    }

    async findById(id: string): Promise<Fleet | null> {
        const dataRead = await this.database.loadDataFromDisk();
        return dataRead.find(fleet => fleet.getId() === id) || null;
    }

    async findAll(): Promise<Fleet[]> {
        return await this.database.loadDataFromDisk();
    }

    async getVehicleByNumberPlate(fleetId: string, numberPlate: string): Promise<Vehicle | null> {
        const dataRead = await this.database.loadDataFromDisk();
        const fleet = dataRead.find(fleet => fleet.getId() === fleetId);
        return fleet?.getVehicleByNumberPlate(numberPlate) || null;
    }

    async delete(fleet: Fleet): Promise<void> {
        const dataRead = await this.database.loadDataFromDisk();
        const index = dataRead.findIndex(fleet => fleet.getId() === fleet.getId());
        dataRead.splice(index, 1);
        await this.database.saveDataToDisk(dataRead);
    }
}