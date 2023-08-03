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
import { CreateCarDto } from './dto/create-car.dto';

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
    console.log('car', car);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    return car;
  }

  @Post()
  createCar(@Body() carDto: CreateCarDto) {
    console.log('Body', carDto);
    return {
      ok: true,
      ...carDto,
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
