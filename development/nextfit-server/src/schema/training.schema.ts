import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Training {
 
  @Prop({required:true})
  title: string;
  
  @Prop({required:true})
  userid: string;
  
  @Prop({required:false})
  exerciseids: string[];
  
  @Prop({required:true})
  startdatetime: Date;
  
  @Prop({required:false})
  enddatetime: Date
}

export type TrainingDokument = Training & Document;
export const TrainingSchema = SchemaFactory.createForClass(Training);