import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class User {
 
  @Prop({required:true})
  firstname: String;
  
  @Prop({required:true})
  lastname: String;
  
  @Prop({required:true, unique:true})
  mail: String;
  
  @Prop({required: true})
  pw: string;
  
}

export type UserDokument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);