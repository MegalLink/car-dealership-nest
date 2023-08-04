import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CarsSandboxService } from './cars_sandbox.service';
import { CreateCarsSandboxDto } from './dto/create-cars_sandbox.dto';
import { UpdateCarsSandboxDto } from './dto/update-cars_sandbox.dto';

@Controller('cars-sandbox')
export class CarsSandboxController {
  constructor(private readonly _carsSandboxService: CarsSandboxService) {}

  @Get()
  getAllCars() {
    return this._carsSandboxService.getAllCars();
  }

  @Get(':id')
  getCarById(@Param('id', new ParseUUIDPipe()) id: string) {
    const car = this._carsSandboxService.getCarById(id);
    return car;
  }

  @Post()
  createCar(@Body() carDto: CreateCarsSandboxDto) {
    console.log('Body', carDto);
    return this._carsSandboxService.createCar(carDto);
  }

  @Patch(':id')
  updateCar(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarsSandboxDto,
  ) {
    return this._carsSandboxService.updateCar(id, updateCarDto);
  }

  @Delete(':id')
  deleteCar(@Param('id') id: string): object {
    console.log('ID:', id);
    return this._carsSandboxService.deleteCar(id);
  }
}
