import mongoose, { Document } from 'mongoose';
import { Training } from './training.schema';
export declare class User {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    trainings: Training[];
}
export type UserDokument = User & Document;
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User>;
