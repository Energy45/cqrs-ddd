import { CreateFleetCommand } from "./app/commands/CreateFleet/CreateFleetCommand";
import { CreateFleetCommandHandler } from "./app/commands/CreateFleet/CreateFleetCommandHandler";
import { RegisterVehicleCommand } from "./app/commands/RegisterVehicle/RegisterVehicleCommand";
import { RegisterVehicleCommandHandler } from "./app/commands/RegisterVehicle/RegisterVehicleCommandHandler";
import { Command } from "commander";
import { FleetJsonRepository } from "./infra/Json/FleetJsonRepository";
import { FleetNotFoundException } from "./domain/exceptions/FleetNotFoundException";
import { VehicleHasAlreadyBeenRegisteredException } from "./domain/exceptions/VehicleHasAlreadyBeenRegisteredException";
import { ParkVehicleCommandHandler } from "./app/commands/ParkVehicle/ParkVehicleCommandHandler";
import { ParkVehicleCommand } from "./app/commands/ParkVehicle/ParkVehicleCommand";
import { VehicleHasAlreadyBeenParkedHere } from "./domain/exceptions/VehicleHasAlreadyBeenParkedHere";

const program = new Command();

const fleetCommand = program.command('fleet');

//Initialize repositories
const fleetRepository = new FleetJsonRepository('fleets.json');



fleetCommand.command('create').argument('<userId>', 'User id to create fleet for').action(async (userId) => {
    const createFleetCommandHandler = new CreateFleetCommandHandler(fleetRepository);
    const fleetCreated = await createFleetCommandHandler.execute(new CreateFleetCommand(userId));
    console.log('Your fleet id is', fleetCreated.getId());
});

fleetCommand.command('register-vehicle')
    .argument('<fleetId>', 'Fleet id where register vehicle')
    .argument('<plateNumber>', 'Plate number of the vehicle')
    .action(async (fleetId, plateNumber) => {
        const registerVehicleCommandHandler = new RegisterVehicleCommandHandler(fleetRepository);
        const registerVehicleCommand = new RegisterVehicleCommand(fleetId, plateNumber);
        try {
            await registerVehicleCommandHandler.execute(registerVehicleCommand);
            console.log('Vehicle registered to fleet');
        } catch (error) {
            if (error instanceof FleetNotFoundException || error instanceof VehicleHasAlreadyBeenRegisteredException) {
                console.error(error.message);
                process.exit(1);
            }
            //Unexpected error
            throw error;
        }
    }
);

fleetCommand.command('localize-vehicle')
    .argument('<fleetId>', 'Fleet id where localize vehicle')
    .argument('<plateNumber>', 'Plate number of the vehicle')
    .argument('<latitude>', 'Latitude of the vehicle')
    .argument('<longitude>', 'Longitude of the vehicle')
    .argument('<altitude>', 'Altitude of the vehicle')
    .action(async (fleetId, plateNumber, latitude, longitude, altitude) => {
        const parkVehicleCommandHandler = new ParkVehicleCommandHandler(fleetRepository);
        const parkVehicleCommand = new ParkVehicleCommand(fleetId, plateNumber, latitude, longitude, altitude);
        try {
            await parkVehicleCommandHandler.execute(parkVehicleCommand);
            console.log('Vehicle localized');
        } catch (error) {
            if (error instanceof FleetNotFoundException || error instanceof VehicleHasAlreadyBeenParkedHere) {
                console.error(error.message);
                process.exit(1);
            }
            //Unexpected error
            throw error;
        }
    });

program.parse(process.argv);
