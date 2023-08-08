import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model } from 'mongoose';
import { PokemonMongo } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { json } from 'stream/consumers';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(PokemonMongo.name)
    private readonly _pokemonModel: Model<PokemonMongo>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    console.log('CreatePokemon', createPokemonDto);

    try {
      const pokemon = await this._pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Pokemon exists in db ${JSON.stringify(error.keyValue)}`,
        );
      }
      console.error(error);
      throw new InternalServerErrorException(
        `Can't create Pokemon - Check logs`,
      );
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
