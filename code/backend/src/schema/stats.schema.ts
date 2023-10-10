import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.shema';
import { Training } from './training.schema';

@Schema()
export class Stats {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userid: User;

  @Prop({ required: false })
  minutes: any[];

  @Prop({ required: false })
  bodypart: any[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Training' }],
    required: true,
  })
  lastCalc: Training[];
}

export type StatsDokument = Stats & Document;
export const StatsSchema = SchemaFactory.createForClass(Stats);
