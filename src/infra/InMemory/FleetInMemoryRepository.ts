import type { Fleet } from "../../domain/core/Fleet";
import { Vehicle } from "../../domain/core/Vehicle";
import { IFleetRepository } from "../../domain/repository/IFleetRepository";

export class FleetInMemoryRepository implements IFleetRepository {
    private fleets: Map<string, Fleet> = new Map();

    async save(entity: Fleet): Promise<void> {
        this.fleets.set(entity.getId(), entity);
    }

    async findById(id: string): Promise<Fleet | null> {
        return this.fleets.get(id) || null;
    }

    async findAll(): Promise<Fleet[]> {
        return Array.from(this.fleets.values());
    }
    
    async delete(entity: Fleet): Promise<void> {
        this.fleets.delete(entity.getId());
    }

    async getVehicleByNumberPlate(fleetId: string, numberPlate: string): Promise<Vehicle | null> {
        const fleet = await this.findById(fleetId);
        if (!fleet) {
            return null;
        }
        return fleet.getVehicleByNumberPlate(numberPlate);
    }
}