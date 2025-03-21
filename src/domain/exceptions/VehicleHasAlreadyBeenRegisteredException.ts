export class VehicleHasAlreadyBeenRegisteredException extends Error {
    constructor(message: string) {
        super(message);
    }
}
