import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CarsSeedService } from './cars_seed.service';

@Controller('cars-seed')
export class CarsSeedController {
  constructor(private readonly _carsSeedService: CarsSeedService) {}

  @Get()
  setCarsSandboxSeed() {
    return this._carsSeedService.populateCarsSeed();
  }
}
