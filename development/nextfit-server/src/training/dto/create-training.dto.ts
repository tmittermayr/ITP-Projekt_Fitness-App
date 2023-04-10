import { TrainingExercise } from 'src/entities/training.exercise.interface';
import { Training } from 'src/schema/training.schema';

export class CreateTrainingDto {
  title: string;
  exerciseids: TrainingExercise[];
}
