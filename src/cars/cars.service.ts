import { Injectable } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v5 } from 'uuid';
import { randomUUID } from 'crypto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
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

  getAllCars(): Car[] {
    return this.cars;
  }

  getCarById(id: string): Car {
    return this.cars.find((obj) => obj.id === id);
  }
}
