import type { Fleet } from "../domain/core/Fleet";
import { Vehicle } from "../domain/core/Vehicle";
import { IFleetRepository } from "../domain/repository/IFleetRepository";

export class FleetInMemoryRepository implements IFleetRepository {
    private fleets: Map<string, Fleet> = new Map();

    save(entity: Fleet): void {
        this.fleets.set(entity.getId(), entity);
        console.log('saving fleet', entity);
    }

    findById(id: string): Fleet | null {
        console.log('finding fleet', id, this.fleets.get(id));
        return this.fleets.get(id) || null;
    }

    findAll(): Fleet[] {
        return Array.from(this.fleets.values());
    }
    
    delete(entity: Fleet): void {
        this.fleets.delete(entity.getId());
    }

    getVehicleByNumberPlate(fleetId: string, numberPlate: string): Vehicle | null {
        const fleet = this.findById(fleetId);
        if (!fleet) {
            return null;
        }
        return fleet.getVehicleByNumberPlate(numberPlate);
    }
}