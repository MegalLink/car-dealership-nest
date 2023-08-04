import { Test, TestingModule } from '@nestjs/testing';
import { CarsSandboxController } from './cars_sandbox.controller';
import { CarsSandboxService } from './cars_sandbox.service';

describe('CarsSandboxController', () => {
  let controller: CarsSandboxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsSandboxController],
      providers: [CarsSandboxService],
    }).compile();

    controller = module.get<CarsSandboxController>(CarsSandboxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
