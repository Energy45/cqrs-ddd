export class FleetNotFoundException extends Error {
    constructor(message: string) {
        super(message);
    }
}
