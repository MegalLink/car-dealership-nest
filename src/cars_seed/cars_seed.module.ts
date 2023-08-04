import { Module } from '@nestjs/common';
import { CarsSeedService } from './cars_seed.service';
import { CarsSeedController } from './cars_seed.controller';
import { CarsSandboxModule } from 'src/cars_sandbox/cars_sandbox.module';

@Module({
  controllers: [CarsSeedController],
  providers: [CarsSeedService],
  imports: [CarsSandboxModule],
})
export class CarsSeedModule {}
