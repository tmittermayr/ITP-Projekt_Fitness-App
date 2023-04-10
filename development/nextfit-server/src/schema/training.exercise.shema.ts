import { Exercise } from './exercise.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { TrainingExerciseSet } from 'src/entities/training.exercise.set.interface';

@Schema()
export class TrainingExercise {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
    required: true,
  })
  exerciseid: Exercise;

  @Prop({ required: false })
  number: number;

  @Prop({ required: true })
  sets: TrainingExerciseSet[];
}

export type TrainingExerciseDokument = TrainingExercise & Document;
export const TrainingExerciseSchema =
  SchemaFactory.createForClass(TrainingExercise);
