import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ _id: false })
export class TrainingExerciseSet {
  @Prop({ required: false })
  index: number;

  @Prop({ required: false })
  weight: number;

  @Prop({ required: false })
  reps: number;

  @Prop({ required: true })
  attribute: string;
}

export type TrainingExerciseSetDokument = TrainingExerciseSet & Document;
export const TrainingExerciseSetSchema =
  SchemaFactory.createForClass(TrainingExerciseSet);
