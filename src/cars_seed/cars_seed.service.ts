import { Injectable } from '@nestjs/common';
import { CarsSandboxService } from 'src/cars_sandbox/cars_sandbox.service';
import { CarSandbox } from 'src/cars_sandbox/interfaces/car_sandbox.interface';

@Injectable()
export class CarsSeedService {
  constructor(private readonly _carsSandboxService: CarsSandboxService) {}

  populateCarsSeed() {
    const carsSeed: CarSandbox[] = [
      {
        id: 'b678f2e9-816e-429c-b4a1-bc994aa63af8',
        brand: 'Toyota',
        model: 'Corolla',
      },
      {
        id: 'ee62f70c-5659-4897-9f6d-3a3d429cb78c',
        brand: 'Honda',
        model: 'Civic',
      },
      {
        id: '4df7e1f0-fbff-4658-8855-45cdd164316a',
        brand: 'Jeep',
        model: 'Cherokee',
      },
    ];

    this._carsSandboxService.populateCarsData(carsSeed);
    return 'Cars Seed Succed';
  }
}
