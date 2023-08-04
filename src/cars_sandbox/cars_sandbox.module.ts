import { Module } from '@nestjs/common';
import { CarsSandboxService } from './cars_sandbox.service';
import { CarsSandboxController } from './cars_sandbox.controller';

@Module({
  controllers: [CarsSandboxController],
  providers: [CarsSandboxService],
  exports: [CarsSandboxService],
})
export class CarsSandboxModule {}
