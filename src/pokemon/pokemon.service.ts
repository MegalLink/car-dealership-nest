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
import {
  PokemonResponse,
  PokemonsResponse,
  PokemonsResponseResult,
} from './interfaces/poke-response.interface';
import { of, forkJoin } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Axios, AxiosResponse } from 'axios';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  constructor(
    private readonly _axiosAdapter: AxiosAdapter,
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

  findAll(queryParameters: PaginationDto) {
    const { limit = 10, offset = 0 } = queryParameters;

    const pokemons = this._pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({
        pokeID: 1,
      })
      .select('-__v');
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
    // TODO: use findOneAndDelete
    const pokemonKey = { _id: mongoID };
    const pokemon = await this._finPokemonBy(pokemonKey);
    pokemon.deleteOne();

    return pokemon;
  }

  async fillDatabase() {
    return of(true).pipe(
      mergeMap(() => {
        return this._axiosAdapter.get<PokemonsResponse>(
          'https://pokeapi.co/api/v2/pokemon?offset=0&limit=2',
        );
      }),
      mergeMap((result: PokemonsResponse) => {
        return of(result.results);
      }),
      mergeMap((results: PokemonsResponseResult[]) => {
        const obs = results.map((result) => {
          return this._axiosAdapter.get<PokemonResponse>(result.url);
        });

        return forkJoin(obs);
      }),
      mergeMap((response: PokemonResponse[]) => {
        const mappedResponse: object = response.map((data: PokemonResponse) => {
          // TODO: refactor mongo Class

          console.log('Api object', JSON.stringify(data));
          const pokemon_mongo: object = {
            name: data.name,
            pokeID: data.id,
            types: [],
            hp: 0,
            attack: 0,
            defense: 0,
          };

          return pokemon_mongo;
        });

        return of(mappedResponse);
      }),
      mergeMap((data: Array<object>) => {
        console.log('Data to put in db', data);
        return this._pokemonModel.insertMany(data);
      }),
      catchError((error) => {
        {
          console.log('errror', error);
          if (error.code === 11000) {
            throw new BadRequestException(
              `Error loading seed pokemons,Pokemon with unique value exists in db  ${JSON.stringify(
                error,
              )}`,
            );
          }

          throw new InternalServerErrorException(
            `Pokemon Service - load seed error ${JSON.stringify(
              error.writeErrors,
            )}`,
          );
        }
      }),
    );
  }
}
