import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exercise, ExerciseDocument } from '../schema/exercise.schema';
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Injectable()
export class ExerciseService {

  constructor(@InjectModel(Exercise.name) private readonly exerciseModel: Model < ExerciseDocument > ) {}

  async findAll(): Promise < ExerciseDocument [] > {
    return this.exerciseModel.find()
      .exec();
  }

  async findOne(id: number) {
    return this.exerciseModel.findById(id);
  }

  async create(createExerciseDto : CreateExerciseDto ): Promise < ExerciseDocument > {
    const exercise = new this.exerciseModel(createExerciseDto);
    return exercise.save();
  }


  /*async findByTarget(target: string){
    return this.exerciseModel.findByTarget(target);
  }
 
  async findByBodypart(bodypart: string) {
    return this.exerciseModel.findByBodypart(bodypart); 
  }

  async findByEquipment(equipment: string){
    return this.exerciseModel.findByEquipment(equipment);
  }*/
}
