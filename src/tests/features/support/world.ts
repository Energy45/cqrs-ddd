import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { Fleet } from '../../../domain/core/Fleet';
import { Location } from '../../../domain/core/Location';
import { IFleetRepository } from '../../../domain/repository/IFleetRepository';
import { FleetInMemoryRepository } from '../../../infra/InMemory/FleetInMemoryRepository';
import { FleetJsonRepository } from '../../../infra/Json/FleetJsonRepository';

const getRepository = (): IFleetRepository => {
  const profile = process.env.CUCUMBER_PROFILE || 'default';
  
  if (profile === 'json') {
    return new FleetJsonRepository('fleets.json');
  } else {
    return new FleetInMemoryRepository();
  }
};

export const fleetRepository = getRepository();

export interface CustomWorld {
  fleet: Fleet;
  vehicleNumberPlate: string;
  exception: Error;
  otherFleet: Fleet;
  location: Location;
}

class FleetWorld extends World<CustomWorld> {
  fleet: Fleet;
  vehicleNumberPlate: string;
  exception: Error;
  otherFleet: Fleet;
  location: Location;

  constructor(props: IWorldOptions) {
    super(props);
    this.fleet = new Fleet('', undefined);
    this.vehicleNumberPlate = '';
    this.exception = new Error();
    this.otherFleet = new Fleet('', undefined);
    this.location = new Location(0, 0, 0);
  }
}

setWorldConstructor(FleetWorld); 