import { Test, TestingModule } from '@nestjs/testing';
import { CarsSeedService } from './cars_seed.service';

describe('CarsSeedService', () => {
  let service: CarsSeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarsSeedService],
    }).compile();

    service = module.get<CarsSeedService>(CarsSeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
