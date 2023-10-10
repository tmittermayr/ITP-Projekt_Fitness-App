import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExerciseDocument = HydratedDocument<Document>;

@Schema()
export class Exercise {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  target: string;

  @Prop({ required: true })
  bodyPart: string;

  @Prop({ required: true })
  equipment: string;

  @Prop({ required: true })
  gifId: string;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
