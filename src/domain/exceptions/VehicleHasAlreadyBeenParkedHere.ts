export class VehicleHasAlreadyBeenParkedHere extends Error {
    constructor(message: string) {
        super(message);
    }
}
