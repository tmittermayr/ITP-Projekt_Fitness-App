import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import * as mongoose from 'mongoose'
import { MongooseModule } from '@nestjs/mongoose';
import { Exercise, ExerciseSchema } from 'src/schema/exercise.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Exercise.name,
        schema: ExerciseSchema
      },
    ])
  ],
  controllers: [ExerciseController],
  providers: [ExerciseService]
})
export class ExerciseModule {}