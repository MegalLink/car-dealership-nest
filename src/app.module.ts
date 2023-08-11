import { Module } from '@nestjs/common';

import { CarsSandboxModule } from './cars_sandbox/cars_sandbox.module';
import { CarsSeedModule } from './cars_seed/cars_seed.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest-cars'),
    CarsSandboxModule,
    CarsSeedModule,
    PokemonModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
