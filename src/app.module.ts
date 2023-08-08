import { Module } from '@nestjs/common';

import { CarsSandboxModule } from './cars_sandbox/cars_sandbox.module';
import { CarsSeedModule } from './cars_seed/cars_seed.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    CarsSandboxModule,
    CarsSeedModule,
    CarsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
