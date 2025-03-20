import { Given, When, Then } from '@cucumber/cucumber';
import { Fleet } from '../../src/domain/core/Fleet';
import { Vehicle } from '../../src/domain/core/Vehicle';
import { User } from '../../src/domain/core/User';
import { RegisterVehicleCommandHandler } from '../../src/app/commands/RegisterVehicle/RegisterVehicleCommandHandler';
import { FleetInMemoryRepository } from '../../src/infra/FleetInMemoryRepository';
import { UserInMemoryRepository } from '../../src/infra/UserInMemoryRepository';
import { RegisterVehicleCommand } from '../../src/app/commands/RegisterVehicle/RegisterVehicleCommand';
import assert from 'node:assert';

// Define an interface for our context
interface CustomWorld {
  fleet?: Fleet;
  user?: User;
  vehicleNumberPlate?: string;
  vehicle?: Vehicle;
}

const fleetRepository = new FleetInMemoryRepository();
const userRepository = new UserInMemoryRepository();

Given('my fleet', function(this: CustomWorld) {
    this.fleet = new Fleet();
    this.user = new User();
    this.user.setFleet(this.fleet);
    fleetRepository.save(this.fleet);
    userRepository.save(this.user);
});

Given('a vehicle', function(this: CustomWorld) {
    this.vehicleNumberPlate = 'FW-345-CW';
});

When('I register this vehicle into my fleet', function(this: CustomWorld) {
    if (!this.fleet || !this.vehicleNumberPlate) return;
    const registerVehicleCommandHandler = new RegisterVehicleCommandHandler(fleetRepository, userRepository);
    registerVehicleCommandHandler.execute(new RegisterVehicleCommand(this.vehicleNumberPlate, this.fleet.getId()));
    this.vehicle = new Vehicle(this.vehicleNumberPlate);
});

Then('this vehicle should be part of my vehicle fleet', function(this: CustomWorld) {
    if (!this.fleet || !this.vehicleNumberPlate) return;
    assert(Array.from(this.fleet.getVehicles().values()).find(vehicle => vehicle.getPlateNumber() === this.vehicleNumberPlate));
});
