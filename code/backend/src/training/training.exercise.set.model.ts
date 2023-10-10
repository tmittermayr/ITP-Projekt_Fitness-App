import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TrainingExerciseSet,
  TrainingExerciseSetSchema,
} from 'src/schema/training.exercise.set.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TrainingExerciseSet.name,
        schema: TrainingExerciseSetSchema,
      },
    ]),
  ],
})
export class TrainingExerciseSetModule {}
