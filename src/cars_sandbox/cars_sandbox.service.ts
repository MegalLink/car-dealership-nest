import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarsSandboxDto } from './dto/create-cars_sandbox.dto';
import { UpdateCarsSandboxDto } from './dto/update-cars_sandbox.dto';
import { CarSandbox } from './interfaces/car_sandbox.interface';
import { v4 } from 'uuid';

const uuid = v4();

@Injectable()
export class CarsSandboxService {
  private _cars: CarSandbox[] = [];

  getAllCars(): CarSandbox[] {
    return this._cars;
  }

  getCarById(id: string): CarSandbox {
    const car = this._cars.find((obj) => obj.id === id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    return car;
  }

  createCar(createCar: CreateCarsSandboxDto): CarSandbox {
    const newCar = { id: uuid, ...createCar };
    this._cars.push(newCar);
    return newCar;
  }

  updateCar(id: string, updateCarDto: UpdateCarsSandboxDto): CarSandbox {
    const index = this._cars.findIndex((car) => car.id === id);
    if (index === -1) {
      throw new NotFoundException(`Not found car with id ${id} to update`);
    }

    const updatedCar: CarSandbox = { ...this._cars[index], ...updateCarDto };

    this._cars[index] = updatedCar;

    return updatedCar;
  }

  deleteCar(id: string): CarSandbox {
    const index = this._cars.findIndex((obj) => obj.id === id);
    if (index === -1)
      throw new NotFoundException(`Car with id ${id} not found`);

    const removedElements = this._cars.splice(index, 1);

    return removedElements[0];
  }

  populateCarsData(cars: CarSandbox[]) {
    if (this._cars.length === 0) {
      this._cars = [...cars];
    }
  }
}
