import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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
    try {
      const pokemon = await this._pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Pokemon exists in db ${JSON.stringify(error.keyValue)}`,
        );
      }
      throw new InternalServerErrorException(
        `Pokemon Service - create error ${JSON.stringify(error)}`,
      );
    }
  }

  private async _finPokemonBy(pokemonKey: object): Promise<PokemonMongo> {
    let pokemon: PokemonMongo;
    try {
      pokemon = await this._pokemonModel.findOne(pokemonKey);
    } catch (error) {
      throw new InternalServerErrorException(
        `Pokemon Service - finPokemonBy error ${JSON.stringify(error)}`,
      );
    }

    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with pokeID: ${JSON.stringify(pokemonKey)} not found`,
      );

    return pokemon;
  }

  findAll() {
    const pokemons = this._pokemonModel.find();
    return pokemons;
  }

  async findOne(pokeID: number) {
    const pokemonKey = { pokeID: pokeID };
    return this._finPokemonBy(pokemonKey);
  }

  async update(id: number, updatePokemonDto: UpdatePokemonDto) {
    const pokemon: PokemonMongo = await this.findOne(id);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
    }
    try {
      await pokemon.updateOne(updatePokemonDto);
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Error updating pokemon,Pokemon with unique value exists in db  ${JSON.stringify(
            error.keyValue,
          )}`,
        );
      }

      throw new InternalServerErrorException(
        `Pokemon Service - update error ${JSON.stringify(error)}`,
      );
    }

    return { ...pokemon.toObject(), ...updatePokemonDto };
  }

  async remove(mongoID: string) {
    const pokemonKey = { _id: mongoID };
    const pokemon = await this._finPokemonBy(pokemonKey);
    pokemon.deleteOne();

    return pokemon;
  }
}
