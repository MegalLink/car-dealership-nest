import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
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
  types: string[];
  @IsPositive()
  hp: number;
  @IsPositive()
  attack: number;
  @IsPositive()
  defense: number;
}
