import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PokemonMongo extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  name: string;
  @Prop({
    unique: true,
    index: true,
  })
  pokeID: string;
  @Prop({})
  types: string[];
  @Prop({})
  hp: number;
  @Prop({})
  attack: number;
  @Prop({})
  defense: number;
}

export const PokemonMongoSchema = SchemaFactory.createForClass(PokemonMongo);
