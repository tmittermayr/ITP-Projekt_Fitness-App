import { Module } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Training, TrainingSchema } from 'src/schema/training.schema';
import { ExerciseModule } from 'src/exercise/exercise.module';
import { UserModule } from 'src/user/user.module';
import {
  TrainingExercise,
  TrainingExerciseSchema,
} from 'src/schema/training.exercise.shema';

@Module({
  imports: [
    ExerciseModule,
    UserModule,
    MongooseModule.forFeature([
      {
        name: Training.name,
        schema: TrainingSchema,
      },
      {
        name: TrainingExercise.name,
        schema: TrainingExerciseSchema,
      },
    ]),
  ],
  controllers: [TrainingController],
  providers: [TrainingService],
})
export class TrainingModule {}
