import { Exercise } from './exercise.schema';
import mongoose, { Document } from 'mongoose';
import { TrainingExerciseSet } from 'src/entities/training.exercise.set.interface';
export declare class TrainingExercise {
    exerciseid: Exercise;
    number: number;
    sets: TrainingExerciseSet[];
}
export type TrainingExerciseDokument = TrainingExercise & Document;
export declare const TrainingExerciseSchema: mongoose.Schema<TrainingExercise, mongoose.Model<TrainingExercise, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, TrainingExercise>;
