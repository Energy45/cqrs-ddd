import { CreateFleetCommand } from "./app/commands/CreateFleet/CreateFleetCommand";
import { CreateFleetCommandHandler } from "./app/commands/CreateFleet/CreateFleetCommandHandler";
import { ParkVehicleCommand } from "./app/commands/ParkVehicle/ParkVehicleCommand";
import { ParkVehicleCommandHandler } from "./app/commands/ParkVehicle/ParkVehicleCommandHandler";
import { RegisterVehicleCommand } from "./app/commands/RegisterVehicle/RegisterVehicleCommand";
import { RegisterVehicleCommandHandler } from "./app/commands/RegisterVehicle/RegisterVehicleCommandHandler";
import { FleetInMemoryRepository } from "./infra/InMemory/FleetInMemoryRepository";

const demo = async () => {
    const fleetRepository = new FleetInMemoryRepository();
    
    const fleetCommandHandler = new CreateFleetCommandHandler(fleetRepository);
    const fleetCreated = await fleetCommandHandler.execute(new CreateFleetCommand('123'));
    console.log('Fleet created', fleetCreated.getId());

    const registerVehicleCommandHandler = new RegisterVehicleCommandHandler(fleetRepository);
    const registerVehicleCommand = new RegisterVehicleCommand(fleetCreated.getId(), '123');
    await registerVehicleCommandHandler.execute(registerVehicleCommand);
    console.log('Vehicle registered');

    const parkVehicleCommandHandler = new ParkVehicleCommandHandler(fleetRepository);
    const parkVehicleCommand = new ParkVehicleCommand(fleetCreated.getId(), '123', 123, 123, 123);
    await parkVehicleCommandHandler.execute(parkVehicleCommand);
    console.log('Vehicle parked');
}

demo();