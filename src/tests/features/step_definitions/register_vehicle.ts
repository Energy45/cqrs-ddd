import { Given, When, Then } from '@cucumber/cucumber';
import { Fleet } from '../../../domain/core/Fleet';
import { RegisterVehicleCommandHandler } from '../../../app/commands/RegisterVehicle/RegisterVehicleCommandHandler';
import { RegisterVehicleCommand } from '../../../app/commands/RegisterVehicle/RegisterVehicleCommand';
import { FleetInMemoryRepository } from '../../../infra/InMemory/FleetInMemoryRepository';
import assert from 'node:assert';
import { Vehicle } from '../../../domain/core/Vehicle';
import { VehicleHasAlreadyBeenRegisteredException } from '../../../domain/exceptions/VehicleHasAlreadyBeenRegisteredException';
import { Location } from '../../../domain/core/Location';
import { ParkVehicleCommandHandler } from '../../../app/commands/ParkVehicle/ParkVehicleCommandHandler';
import { ParkVehicleCommand } from '../../../app/commands/ParkVehicle/ParkVehicleCommand';
import { VehicleHasAlreadyBeenParkedHere } from '../../../domain/exceptions/VehicleHasAlreadyBeenParkedHere';

interface CustomWorld {
  fleet: Fleet;
  vehicleNumberPlate: string;
  exception: Error;
  otherFleet: Fleet;
  location: Location;
}

const fleetRepository = new FleetInMemoryRepository();

Given('my fleet', async function(this: CustomWorld) {
    this.fleet = new Fleet('123');
    await fleetRepository.save(this.fleet);
});

Given('the fleet of another user', async function(this: CustomWorld) {
    this.otherFleet = new Fleet('456');
    await fleetRepository.save(this.otherFleet);
});

Given('a vehicle', function(this: CustomWorld) {
    this.vehicleNumberPlate = 'FW-345-CW';
});

Given('I have registered this vehicle into my fleet', async function(this: CustomWorld) {
    this.fleet.addVehicle(new Vehicle(this.vehicleNumberPlate));
});

Given('a location', function(this: CustomWorld) {
    this.location = new Location(100, 100, 100);
});

Given('this vehicle has been registered into the other user\'s fleet', async function(this: CustomWorld) {
    this.otherFleet.addVehicle(new Vehicle(this.vehicleNumberPlate));
});

Given('my vehicle has been parked into this location', async function(this: CustomWorld) {
    const parkVehicleCommandHandler = new ParkVehicleCommandHandler(fleetRepository);
    await parkVehicleCommandHandler.execute(new ParkVehicleCommand(this.fleet.getId(), this.vehicleNumberPlate, this.location.getLatitude(), this.location.getLongitude(), this.location.getAltitude()));
});

When('I register this vehicle into my fleet', async function(this: CustomWorld) {
    if (!this.fleet || !this.vehicleNumberPlate) return;
    const registerVehicleCommandHandler = new RegisterVehicleCommandHandler(fleetRepository);
    await registerVehicleCommandHandler.execute(new RegisterVehicleCommand(this.fleet.getId(), this.vehicleNumberPlate));
});

When('I park my vehicle at this location', async function(this: CustomWorld) {
    const parkVehicleCommandHandler = new ParkVehicleCommandHandler(fleetRepository);
    await parkVehicleCommandHandler.execute(new ParkVehicleCommand(this.fleet.getId(), this.vehicleNumberPlate, this.location.getLatitude(), this.location.getLongitude(), this.location.getAltitude()));
});

When('I try to register this vehicle into my fleet', async function(this: CustomWorld) {
    if (!this.fleet || !this.vehicleNumberPlate) return;
    const registerVehicleCommandHandler = new RegisterVehicleCommandHandler(fleetRepository);
    try {
        await registerVehicleCommandHandler.execute(new RegisterVehicleCommand(this.fleet.getId(), this.vehicleNumberPlate));
    } catch (error) {
        this.exception = error as Error;
    }
});

Then('this vehicle should be part of my vehicle fleet', function(this: CustomWorld) {
    if (!this.fleet || !this.vehicleNumberPlate) return;
    assert(this.fleet.getVehicles().some((vehicle: Vehicle) => vehicle.getPlateNumber() === this.vehicleNumberPlate));
});

Then('I should be informed this this vehicle has already been registered into my fleet', function(this: CustomWorld) {
    assert(this.exception instanceof VehicleHasAlreadyBeenRegisteredException);
});

Then('the known location of my vehicle should verify this location', function(this: CustomWorld) {
    assert(this.fleet.getVehicles().find((vehicle: Vehicle) => vehicle.getPlateNumber() === this.vehicleNumberPlate)?.getLocation().equals(this.location));
});

When('I try to park my vehicle at this location', async function(this: CustomWorld) {
    const parkVehicleCommandHandler = new ParkVehicleCommandHandler(fleetRepository);
    try {
        await parkVehicleCommandHandler.execute(new ParkVehicleCommand(this.fleet.getId(), this.vehicleNumberPlate, this.location.getLatitude(), this.location.getLongitude(), this.location.getAltitude()));
    } catch (error) {
        this.exception = error as Error;
    }
});

Then('I should be informed that my vehicle is already parked at this location', function(this: CustomWorld) {
    assert(this.exception instanceof VehicleHasAlreadyBeenParkedHere);
});
