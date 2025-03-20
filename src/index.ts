import { CreateFleetCommand } from "./app/commands/CreateFleet/CreateFleetCommand";
import { CreateFleetCommandHandler } from "./app/commands/CreateFleet/CreateFleetCommandHandler";
import { CreateUserCommand } from "./app/commands/CreateUser/CreateUserCommand";
import { CreateUserCommandHandler } from "./app/commands/CreateUser/CreateUserCommandHandler";
import { ParkVehicleCommand } from "./app/commands/ParkVehicle/ParkVehicleCommand";
import { ParkVehicleCommandHandler } from "./app/commands/ParkVehicle/ParkVehicleCommandHandler";
import { RegisterVehicleCommand } from "./app/commands/RegisterVehicle/RegisterVehicleCommand";
import { RegisterVehicleCommandHandler } from "./app/commands/RegisterVehicle/RegisterVehicleCommandHandler";
import { FleetInMemoryRepository } from "./infra/FleetInMemoryRepository";
import { UserInMemoryRepository } from "./infra/UserInMemoryRepository";

const userRepository = new UserInMemoryRepository();
const fleetRepository = new FleetInMemoryRepository();
const createUserCommandHandler = new CreateUserCommandHandler(userRepository);

const userCreated = createUserCommandHandler.execute(new CreateUserCommand());

const createFleetCommandHandler = new CreateFleetCommandHandler(userRepository, fleetRepository);

const fleetCreated = createFleetCommandHandler.execute(new CreateFleetCommand(userCreated.getId()));

const registerVehicleCommandHandler = new RegisterVehicleCommandHandler(fleetRepository, userRepository);

registerVehicleCommandHandler.execute(new RegisterVehicleCommand("FW-360-CW", fleetCreated.getId()));

console.log('fleets', fleetRepository.findAll());
console.log('users', userRepository.findAll());

const parkVehicleCommandHandler = new ParkVehicleCommandHandler(fleetRepository);

parkVehicleCommandHandler.execute(
    new ParkVehicleCommand(
        fleetCreated.getId(), 
        "FW-360-CW",
         10, 10, 10
        )
    );

parkVehicleCommandHandler.execute(
    new ParkVehicleCommand(
        fleetCreated.getId(), 
        "FW-360-CW",
            10, 10, 10
        )
    );

console.log('fleets after parked', fleetRepository.findAll().forEach(fleet => {
    console.log('fleet', fleet.getId(), fleet.getVehicles());
}));
