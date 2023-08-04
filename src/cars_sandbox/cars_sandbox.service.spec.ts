import { Test, TestingModule } from '@nestjs/testing';
import { CarsSandboxService } from './cars_sandbox.service';

describe('CarsSandboxService', () => {
  let service: CarsSandboxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarsSandboxService],
    }).compile();

    service = module.get<CarsSandboxService>(CarsSandboxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
