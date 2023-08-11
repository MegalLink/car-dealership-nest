export interface PokemonsResponse {
  results: PokemonsResponseResult[];
}

export interface PokemonsResponseResult {
  name: string;
  url: string;
}

interface Sprites {
  other: Other;
}

interface Other {
  dream_world: DreamWorld;
}

interface DreamWorld {
  front_default: string;
}

interface Stat2 {
  name: string;
  url: string;
}

export interface Stat {
  base_stat: number;
  stat: Stat2;
}

interface TypeInfo {
  name: string;
  url: string;
}

interface Type {
  slot: number;
  type: TypeInfo;
}

interface Transformation {
  name: string;
  url: string;
}

export interface PokemonResponse {
  height: number;
  id: number;
  name: string;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
  transformations?: Transformation[];
}
