import { Module } from '@nestjs/common';

import { CarsSandboxModule } from './cars_sandbox/cars_sandbox.module';
import { CarsSeedModule } from './cars_seed/cars_seed.module';

@Module({
  imports: [CarsSandboxModule, CarsSeedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
