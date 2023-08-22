import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreatePokemonDto {
  @IsInt()
  @IsPositive()
  @Min(1)
  pokeID: number;
  @IsString()
  @MinLength(2)
  name: string;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => TypePokemonDto)
  types: TypePokemonDto[];
  @IsPositive()
  hp: number;
  @IsPositive()
  attack: number;
  @IsPositive()
  defense: number;
}

export class TypePokemonDto {
  @ValidateNested({ each: true })
  @Type(() => TypePokemon)
  type: TypePokemon;
}
export class TypePokemon {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  url: string;
}

export class StatsPokemonDto {
  @IsOptional()
  base_stat: number;
  @IsOptional()
  efforr: number;
  @ValidateNested({ each: true })
  @Type(() => StatPokemon)
  stat: StatPokemon;
}

export class StatPokemon {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  url: string;
}
