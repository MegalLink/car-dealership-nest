import { Injectable } from '@nestjs/common';

@Injectable()
export class CarsService {
  private cars = [
    { id: 1, brand: 'Toyota', model: 'Corolla' },
    { id: 2, brand: 'Honda', model: 'Civic' },
    { id: 3, brand: 'Jeep', model: 'Cherokee' },
  ];

  getAllCars(): object[] {
    return this.cars;
  }

  getCarById(id: number): object {
    return this.cars.find((obj) => obj.id === id);
  }
}
