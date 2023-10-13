import { Exercise } from '../schema/exercise.schema';
import { TrainingExerciseSet } from './training.exercise.set.interface';
export interface TrainingExercise {
    exerciseid: Exercise;
    number: number;
    sets: TrainingExerciseSet[];
}
