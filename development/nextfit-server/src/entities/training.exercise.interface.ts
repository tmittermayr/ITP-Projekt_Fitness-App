import { TrainingExerciseSet } from './training.exercise.set.interface';

export interface TrainingExercise {
  id: string;
  number: number;
  sets: TrainingExerciseSet[];
}
