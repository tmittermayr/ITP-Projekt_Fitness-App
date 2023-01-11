import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExerciseDocument = HydratedDocument<Document>;

@Schema()
export class Exercise {
  @Prop()
  name: string;

  @Prop()
  target: string;

  @Prop()
  bodypart: string;

  @Prop()
  equipment: string;

  @Prop()
  gifid: number; 
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);