import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Training, TrainingDokument } from 'src/schema/training.schema';
import { User, UserDokument } from 'src/schema/user.shema';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';

@Injectable()
export class TrainingService {

  constructor(
    @InjectModel(Training.name) private readonly trainingModel: Model <TrainingDokument>,
    @InjectModel(User.name) private readonly userModel: Model <UserDokument>) {}
  
  _dateFormat(){
    const date_Object = new Date();
    let date_String: string =
    date_Object.getDate() +
    "." +
    (date_Object.getMonth() + 1) +
    "." +
    +date_Object.getFullYear();
    
  return date_String;

  }

  async start(trainingDto: Readonly<CreateTrainingDto>,userid): Promise <TrainingDokument | HttpException>{
    const user = await this.userModel.findById({userid}).exec();
    if(!user) return new HttpException("User token invalid user doesn't exist", HttpStatus.NOT_FOUND)

    let title = trainingDto.title;
    if(!title) title = `Training vom ${this._dateFormat()}` 
    const training = new this.trainingModel({
      title: title,
      userid: userid,
      exerciseids: trainingDto.exerciseids,
      startdatetime: Date.now(),
      enddatetime: null
    });
    return training.save();
  }
  
  async stop(id: string) {
    const filter = { enddatetime: null, userid:id}
    const update = { enddatetime: Date.now() }
    
    await this.trainingModel.findOneAndUpdate(filter,update)
  }

  async addExercise(exercises, userid){

  }

  async findAll(userid): Promise <TrainingDokument[]>{
    return await this.trainingModel.find({userid:userid})
  }
  
  async findOne(id: number): Promise <TrainingDokument> {
    return await this.trainingModel.findById(id);
  }

  async remove(id: number) {
    return await this.trainingModel.findByIdAndDelete(id);
  }
}