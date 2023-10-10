import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TrainingExercise,
  TrainingExerciseSchema,
} from 'src/schema/training.exercise.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TrainingExercise.name,
        schema: TrainingExerciseSchema,
      },
    ]),
  ],
})
export class TrainingExerciseModule {}
