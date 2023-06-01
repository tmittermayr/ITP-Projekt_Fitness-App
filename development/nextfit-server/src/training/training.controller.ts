import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpException,
} from '@nestjs/common';
import { TrainingService } from './training.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { TrainingDokument } from 'src/schema/training.schema';
import { TrainingExercise } from 'src/entities/training.exercise.interface';
import { AddExerciseDto } from './dto/add-exercise.dto';
import { request } from 'http';
import { AddSetDto } from './dto/add-set.dto';

@UseGuards(JwtGuard)
@Controller('training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post('/start')
  start(
    @Body() createTrainingDto: CreateTrainingDto,
    @Request() request: any,
  ): Promise<TrainingDokument | HttpException> {
    const userid = request.user.id;
    console.log(`TrainingC: {Training von ${userid} gestartet}`);
    return this.trainingService.start(createTrainingDto, userid);
  }

  @Patch('/stop')
  stop(@Request() request: any) {
    const userid = request.user.id;
    return this.trainingService.stop(userid);
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.trainingService.findOne(id);
  }

  @Get('populated/:id')
  findOnePopulate(@Param('id') id: string) {
    return this.trainingService.findOnePopulate(id);
  }

  @Get()
  find(@Request() request: any) {
    const userid = request.user.id;
    return this.trainingService.findAll(userid);
  }

  @Patch('/addExercise')
  add(@Request() request: any, @Body() addExerciseDto: AddExerciseDto) {
    const userid = request.user.id;
    return this.trainingService.addExercise(addExerciseDto.exerciseid, userid);
  }

  @Patch('/addSet')
  addSet(@Request() request: any, @Body() addSetDto: AddSetDto) {
    const userid = request.user.id;
    return this.trainingService.addSet(
      addSetDto.weight,
      addSetDto.reps,
      addSetDto.attribute,
      addSetDto.exerciseid,
      userid,
    );
  }

  @Get('/isActive/:type')
  isActive(@Request() request: any, @Param('type') type: string) {
    const userid = request.user.id;
    return this.trainingService.isActive(userid, type);
  }

  @Delete('/:id')
  remove(@Request() request: any, @Param('id') id: number) {
    const userid = request.user.id;
    return this.trainingService.remove(userid, id);
  }
}
