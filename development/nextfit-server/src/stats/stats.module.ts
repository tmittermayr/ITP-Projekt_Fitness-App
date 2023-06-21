import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Stats, StatsSchema } from 'src/schema/stats.schema';
import { UserModule } from 'src/user/user.module';
import { Training, TrainingSchema } from 'src/schema/training.schema';
import { TrainingModule } from 'src/training/training.module';

@Module({
  imports: [
    UserModule,
    TrainingModule,
    MongooseModule.forFeature([
      {
        name: Stats.name,
        schema: StatsSchema,
      },
    ]),
  ],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
