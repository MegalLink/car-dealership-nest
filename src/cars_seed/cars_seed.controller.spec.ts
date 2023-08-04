import { Test, TestingModule } from '@nestjs/testing';
import { CarsSeedController } from './cars_seed.controller';
import { CarsSeedService } from './cars_seed.service';

describe('CarsSeedController', () => {
  let controller: CarsSeedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsSeedController],
      providers: [CarsSeedService],
    }).compile();

    controller = module.get<CarsSeedController>(CarsSeedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
