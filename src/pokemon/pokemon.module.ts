import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonMongo, PokemonMongoSchema } from './entities/pokemon.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeature([
      {
        name: PokemonMongo.name,
        schema: PokemonMongoSchema,
      },
    ]),
    CommonModule,
  ],
})
export class PokemonModule {}
