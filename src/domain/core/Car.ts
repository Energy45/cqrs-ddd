import { Vehicle } from "./Vehicle";

export class Car extends Vehicle {
    public constructor(plateNumber: string, id?: string) {
        super(plateNumber, id);
    }
}