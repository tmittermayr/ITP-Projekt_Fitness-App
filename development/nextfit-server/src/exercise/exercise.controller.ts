import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}
  
  @Get()
  findAll() {
    return this.exerciseService.findAll();
  }
   
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.exerciseService.findOne(id);
  }

  @Get(':target')
  findByTaraget(@Param('target') target: string){
    return this.exerciseService.findByTarget(target)
  } 

  @Post()
  create(@Body() createExerciseDto : CreateExerciseDto) {
    return this.exerciseService.create(createExerciseDto);
  }
}
