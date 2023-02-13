import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExerciseService } from 'src/exercise/exercise.service';
import { Model } from 'mongoose';
import { Training, TrainingDokument } from 'src/schema/training.schema';
import { User, UserDokument } from 'src/schema/user.shema';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';

@Injectable()
export class TrainingService {

  constructor(
    @InjectModel(Training.name) private readonly trainingModel: Model <TrainingDokument>,
    //@InjectModel(User.name) private readonly userModel: Model <UserDokument>
    private exerciseService: ExerciseService
    ) {}
  
  _dateFormat(){
    const date_Object = new Date();
    let date_String: string =
    date_Object.getDate() +
    "/" +
    (date_Object.getMonth() + 1) +
    "/" +
    +date_Object.getFullYear();
    
  return date_String;
  }

  async validateExercise(exerciseObj):Promise<Boolean>{
    const exercise = await this.exerciseService.findOne(exerciseObj.id)
    const exerciseExist = !!exercise;

    if (!exerciseExist) return false;
    return true;
  }

  validateSet(set):Boolean{
    const attribute = set.attribute;
    if(attribute != "Warm-Up" && attribute != "Set" && attribute != "") return false;
    return true;
  }

  async start(trainingDto: Readonly<CreateTrainingDto>,userid): Promise <TrainingDokument | HttpException>{
    //const user = await this.userModel.findById({userid}).exec();
    //if(!user) return new HttpException("User token invalid user doesn't exist", HttpStatus.NOT_FOUND)

    let title = trainingDto.title;
    if(!title) title = `Training vom ${this._dateFormat()}` 

    //trainingDto.exerciseids.forEach(exercise => {
     // if(!this.validateExercise(exercise)) return new HttpException("Exercise schema isn't ok", HttpStatus.BAD_REQUEST)
    //});

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

  async isActive(id:string):Promise<Boolean>{
    const filter = { enddatetime: null, userid:id}
    
    if(this.trainingModel.find(filter) != null) return true;

    return false;
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