import { TrainingExercise } from './training.exercise.interface';
export interface TrainingI {
    title: string;
    userid: string;
    exerciseids: TrainingExercise[];
    startdatetime: Date;
    enddatetime: Date;
}
