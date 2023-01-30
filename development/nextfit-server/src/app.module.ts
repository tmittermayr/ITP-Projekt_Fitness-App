import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExerciseModule } from './exercise/exercise.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TrainingModule } from './training/training.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admindb:EJ82GMbhXvA1YTq7@nextfitdb.qfweniu.mongodb.net/?retryWrites=true&w=majority'
    ),
    ExerciseModule,
    AuthModule,
    UserModule,
    TrainingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
