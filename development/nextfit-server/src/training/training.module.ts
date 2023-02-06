import { Module } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Training, TrainingSchema } from 'src/schema/training.schema';
import { UserModule } from 'src/user/user.module';
import { ExerciseModule } from 'src/exercise/exercise.module';

@Module({
  imports:[ExerciseModule,
    MongooseModule.forFeature([
      {
      name: Training.name,
      schema: TrainingSchema
    }
  ]),
],
  controllers: [TrainingController],
  providers: [TrainingService]
})
export class TrainingModule {}
