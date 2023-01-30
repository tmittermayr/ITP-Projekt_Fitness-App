import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExerciseDocument = HydratedDocument<Document>;

@Schema()
export class Exercise {
  @Prop({required:true})
  name: string;

  @Prop({required:true})
  target: string;

  @Prop({required:true})
  bodypart: string;

  @Prop({required:true})
  equipment: string;

  @Prop({required:true})
  gifid: number; 
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);