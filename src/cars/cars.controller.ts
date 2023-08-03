import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly _carsSvc: CarsService) {}

  @Get()
  getAllCars() {
    return this._carsSvc.getAllCars();
  }

  @Get(':id')
  getCarById(@Param('id', new ParseUUIDPipe()) id: string) {
    const car = this._carsSvc.getCarById(id);
    return car;
  }

  @Post()
  createCar(@Body() carDto: CreateCarDto) {
    console.log('Body', carDto);
    return this._carsSvc.createCar(carDto);
  }

  @Patch(':id')
  updateCar(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this._carsSvc.updateCar(id, updateCarDto);
  }

  @Delete(':id')
  deleteCar(@Param('id') id: string): object {
    console.log('ID:', id);
    return this._carsSvc.deleteCar(id);
  }
}
