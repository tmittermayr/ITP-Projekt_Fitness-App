import mongoose, { Document } from 'mongoose';
import { TrainingExercise } from 'src/schema/training.exercise.shema';
import { User } from './user.shema';
export declare class Training {
    title: string;
    userid: User;
    exerciseids: TrainingExercise[];
    startdatetime: Date;
    enddatetime: Date;
}
export type TrainingDokument = Training & Document;
export declare const TrainingSchema: mongoose.Schema<Training, mongoose.Model<Training, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Training>;
