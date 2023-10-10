import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { TrainingExercise } from 'src/schema/training.exercise.shema';
import { User } from './user.shema';

@Schema()
export class Training {
  @Prop({ required: true })
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userid: User;

  @Prop({ required: false })
  exerciseids: TrainingExercise[];

  @Prop({ required: true })
  startdatetime: Date;

  @Prop({ required: false })
  enddatetime: Date;
}

export type TrainingDokument = Training & Document;
export const TrainingSchema = SchemaFactory.createForClass(Training);
