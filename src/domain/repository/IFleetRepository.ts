import type { Fleet } from "../core/Fleet";
import { Vehicle } from "../core/Vehicle";
import type { IRepository } from "../interfaces/IRepository";

export interface IFleetRepository extends IRepository<Fleet> {
    getVehicleByNumberPlate(fleetId: string, numberPlate: string): Vehicle | null;
}
