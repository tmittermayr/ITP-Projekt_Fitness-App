import mongoose, { Document } from 'mongoose';
export declare class TrainingExerciseSet {
    index: number;
    weight: number;
    reps: number;
    attribute: string;
}
export type TrainingExerciseSetDokument = TrainingExerciseSet & Document;
export declare const TrainingExerciseSetSchema: mongoose.Schema<TrainingExerciseSet, mongoose.Model<TrainingExerciseSet, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, TrainingExerciseSet>;
