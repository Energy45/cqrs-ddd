import { Fleet } from "../../domain/core/Fleet";
import { Vehicle } from "../../domain/core/Vehicle";
import { IFleetRepository } from "../../domain/repository/IFleetRepository";
import { JsonDatabase } from "./JsonDatabase";

export class FleetJsonRepository implements IFleetRepository {
    private database: JsonDatabase<Fleet[]>

    constructor(private readonly filename: string) {
        this.database = new JsonDatabase<Fleet[]>(filename);
    }

    async save(fleet: Fleet): Promise<void> {
        const dataRead = await this.loadDataDeserialize();
        const realData = dataRead.filter(fleetTmp => fleetTmp.getUserId() !== fleet.getUserId());
        realData.push(fleet);
        await this.database.saveDataToDisk(realData);
    }

    async findById(id: string): Promise<Fleet | null> {
        const dataRead = await this.loadDataDeserialize();
        return dataRead.find(fleet => fleet.getId() === id) || null;
    }

    async findAll(): Promise<Fleet[]> {
        return await this.loadDataDeserialize();
    }

    async getVehicleByNumberPlate(fleetId: string, numberPlate: string): Promise<Vehicle | null> {
        const dataRead = await this.loadDataDeserialize();
        const fleet = dataRead.find(fleet => fleet.getId() === fleetId);
        return fleet?.getVehicleByNumberPlate(numberPlate) || null;
    }

    async delete(fleet: Fleet): Promise<void> {
        const dataRead = await this.loadDataDeserialize();
        const index = dataRead.findIndex(fleetTmp => fleetTmp.getId() === fleet.getId());
        dataRead.splice(index, 1);
        await this.database.saveDataToDisk(dataRead);
    }

    private async loadDataDeserialize(): Promise<Fleet[]> {
        return (await this.database.loadDataFromDisk()).map<Fleet>(item => Fleet.create(item.id, item.userId, item.vehicles));
    }
}