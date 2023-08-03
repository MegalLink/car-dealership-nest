import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v5 } from 'uuid';
import { randomUUID } from 'crypto';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

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
    const car = this.cars.find((obj) => obj.id === id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    return car;
  }

  createCar(createCar: CreateCarDto): Car {
    const newCar = { id: randomUUID(), ...createCar };
    this.cars.push(newCar);
    return newCar;
  }

  updateCar(id: string, updateCarDto: UpdateCarDto): Car {
    const index = this.cars.findIndex((car) => car.id === id);
    if (index === -1) {
      throw new NotFoundException(`Not found car with id ${id} to update`);
    }

    const updatedCar: Car = { ...this.cars[index], ...updateCarDto };

    this.cars[index] = updatedCar;

    return updatedCar;
  }

  deleteCar(id: string): Car {
    const index = this.cars.findIndex((obj) => obj.id === id);
    if (index === -1)
      throw new NotFoundException(`Car with id ${id} not found`);

    const removedElements = this.cars.splice(index, 1);

    return removedElements[0];
  }
}
