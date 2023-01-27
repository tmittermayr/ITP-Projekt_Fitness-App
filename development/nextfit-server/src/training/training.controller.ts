import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Request } from '@nestjs/common';
import { TrainingService } from './training.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { TrainingDokument } from 'src/schema/training.schema';
import { TrainingExercise } from 'src/entities/training.exercise.interface';

@UseGuards(JwtGuard)
@Controller('training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post('/start')
  start(@Body() createTrainingDto: CreateTrainingDto, @Request() request: any) {
    const userid = request.user.id;
    console.log(userid);
    return this.trainingService.start(createTrainingDto,userid)
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

  @Get('/all')
  find(@Request() request:any){
    const userid = request.user.id;
    return this.trainingService.findAll(userid);
  }

  @Patch('/addExercise')
  add(@Body() exercises: TrainingExercise[]){
     
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.trainingService.remove(id);
  }

}
