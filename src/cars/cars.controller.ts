import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly _carsSvc: CarsService) {}

  @Get()
  getAllCars() {
    return this._carsSvc.getAllCars();
  }

  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: number) {
    const car = this._carsSvc.getCarById(id);
    console.log('car', car);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    return car;
  }

  @Post()
  createCar(@Body() body: any) {
    console.log('Body', typeof body);
    return {
      ok: true,
    };
  }

  @Patch(':id')
  updateCar(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    console.log('Body', typeof body, 'ID:', id);
    return {
      ok: true,
    };
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number): object {
    console.log('ID:', id);
    return {
      ok: true,
    };
  }
}
