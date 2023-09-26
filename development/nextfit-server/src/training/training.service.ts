import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExerciseService } from 'src/exercise/exercise.service';
import mongoose, { Model } from 'mongoose';
import { Training, TrainingDokument } from 'src/schema/training.schema';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UserService } from 'src/user/user.service';
import { Exercise, ExerciseDocument } from 'src/schema/exercise.schema';
import {
  TrainingExercise,
  TrainingExerciseDokument,
} from 'src/schema/training.exercise.shema';
import {
  TrainingExerciseSet,
  TrainingExerciseSetDokument,
} from 'src/schema/training.exercise.set.shema';
import { HttpStatusCode } from 'axios';

@Injectable()
export class TrainingService {
  constructor(
    @InjectModel(Training.name)
    private readonly trainingModel: Model<TrainingDokument>,
    @InjectModel(TrainingExercise.name)
    private readonly trainingExerciseModel: Model<TrainingExerciseDokument>,
    @InjectModel(TrainingExerciseSet.name)
    private readonly trainingExerciseSetModel: Model<TrainingExerciseSetDokument>,
    @InjectModel(Exercise.name)
    private readonly exerciseModel: Model<ExerciseDocument>,
    private userService: UserService,
    private exerciseService: ExerciseService,
  ) {}

  _dateFormat() {
    const date_Object = new Date();
    const date_String: string =
      date_Object.getDate() +
      '/' +
      (date_Object.getMonth() + 1) +
      '/' +
      +date_Object.getFullYear();

    return date_String;
  }

  async validateExercise(exerciseid): Promise<boolean> {
    const exercise = await this.exerciseService.findOne(exerciseid);
    const exerciseExist = !!exercise;

    if (!exerciseExist) return false;
    return true;
  }

  exerciseTrainingCheck(exerciseids, exerciseid): number {
    for (let i = 0; i < exerciseids.length; i++) {
      const exercise = exerciseids[i];
      if (exercise.exerciseid == exerciseid) return i;
    }

    return -1;
  }

  validateSet(set): boolean {
    const attribute = set.attribute;
    if (attribute != 'Warm-Up' && attribute != 'Set' && attribute != '')
      return false;
    return true;
  }

  async start(
    trainingDto: Readonly<CreateTrainingDto>,
    userid,
  ): Promise<TrainingDokument | HttpException> {
    const user = await this.userService.findById(userid);
    if (!user)
      return new HttpException(
        "User token invalid user doesn't exist",
        HttpStatus.NOT_FOUND,
      );

    const trainingExist = await this.isActive(userid, 'boolean');
    if (trainingExist) {
      return new HttpException(
        'Training already started',
        HttpStatus.FORBIDDEN,
      );
    }

    let title = trainingDto.title;
    if (!title) title = `Training vom ${this._dateFormat()}`;
    if (trainingDto.exerciseids !== undefined) {
      trainingDto.exerciseids.forEach((exercise) => {
        if (!this.validateExercise(exercise))
          return new HttpException(
            "Exercise schema isn't ok",
            HttpStatus.BAD_REQUEST,
          );
      });
    }
    const training = new this.trainingModel({
      title: title,
      userid: userid,
      exerciseids:
        trainingDto.exerciseids == undefined ? [] : trainingDto.exerciseids,
      startdatetime: Date.now(),
      enddatetime: null,
    });
    const newTraining = await training.save();

    await this.userService.addTrainingId(newTraining._id, userid);

    return newTraining;
  }

  async stop(id: string) {
    const filter = { enddatetime: null, userid: id };
    const update = { enddatetime: Date.now() };

    const training = await this.trainingModel.findOneAndUpdate(filter, update);
    if (training.exerciseids.length === 0) {
      await this.trainingModel.findByIdAndDelete(training.id);
    }
  }

  async addExercise(exerciseid: string, userid: any) {
    const trainingExist = this.isActive(userid, 'boolean');
    if (!trainingExist)
      return new HttpException('No current training', HttpStatus.NOT_FOUND);

    const exerciseExist = await this.validateExercise(exerciseid);
    if (!exerciseExist)
      return new HttpException('No such exercise', HttpStatus.BAD_REQUEST);

    const filter = { enddatetime: null, userid: userid };
    const training = await this.trainingModel.findOne(filter);
    training.exerciseids.push(
      new this.trainingExerciseModel({
        exerciseid: exerciseid,
        number: training.exerciseids.length + 1,
        sets: [],
      }),
    );
    const update = { exerciseids: training.exerciseids };

    return await this.trainingModel.findByIdAndUpdate(training.id, update);
  }

  async addSet(
    weight: number,
    reps: number,
    attribute: string,
    exerciseid: string,
    userid: any,
  ) {
    const trainingExist = this.isActive(userid, 'boolean');
    if (!trainingExist)
      return new HttpException('No current training', HttpStatus.NOT_FOUND);

    const filter = { enddatetime: null, userid: userid };
    const training = await this.trainingModel.findOne(filter);
    if (training.exerciseids.length === 0)
      return new HttpException(
        'No exercises in this Training',
        HttpStatus.BAD_REQUEST,
      );

    const exerciseIndex = this.exerciseTrainingCheck(
      training.exerciseids,
      exerciseid,
    );
    if (exerciseIndex == -1)
      return new HttpException(
        'Training missing exercise',
        HttpStatus.BAD_REQUEST,
      );

    const res = await this.trainingModel
      .find({ enddatetime: null, userid: userid }, 'exerciseids')
      .exec();
    const exerciseids = res[0].exerciseids;

    for (let i = 0; i < exerciseids.length; i++) {
      const element = exerciseids[i];
      const id = element.exerciseid.toString();
      if (id === exerciseid) {
        element.sets.push(
          new this.trainingExerciseSetModel({
            index: element.sets.length,
            weight: weight,
            reps: reps,
            attribute: attribute,
          }),
        );
      }
    }
    const update = { exerciseids: exerciseids };
    return await this.trainingModel.findByIdAndUpdate(training.id, update);
  }

  async isActive(userid, type): Promise<Training | boolean | HttpException> {
    const filter = { enddatetime: null, userid: userid };
    const training = await this.trainingModel.findOne(filter);
    const trainingExist = !!training;
    if (trainingExist && type === 'object') {
      return training;
    } else if (!trainingExist && type === 'object') {
      return new HttpException('No current training', HttpStatus.NOT_FOUND);
    } else {
      return trainingExist;
    }
  }

  async findAll(userid): Promise<TrainingDokument[]> {
    return await this.trainingModel.find({ userid: userid });
  }

  async findOne(
    id: number,
    userid: any,
  ): Promise<TrainingDokument | HttpException> {
    const training = await this.trainingModel.findById(id);
    const trainingExist = !!training;
    if (trainingExist) {
      if (training.userid == userid) {
        return training;
      } else {
        return new HttpException(
          'No privilages for this action',
          HttpStatus.FORBIDDEN,
        );
      }
    } else {
      return new HttpException('No such Training', HttpStatus.NOT_FOUND);
    }
  }

  async findOnePopulate(id: string) {
    return await this.trainingModel.findOne({ _id: id }).populate({
      path: 'exerciseids',
      match: [this.exerciseModel],
      populate: { path: 'exerciseid', model: this.exerciseModel },
    });
  }

  async toTrainingsPlan(userid: any, id: string) {
    const training = await this.trainingModel.findById(id);
    if (training.userid === userid) {
      return new HttpException(
        'No privileges for this action',
        HttpStatus.FORBIDDEN,
      );
    } else {
      const update = { isTrainingsPlan: true };
      await this.trainingModel.findByIdAndUpdate(id, update);
      return HttpStatus.NO_CONTENT;
    }
  }

  async remove(userid: string, id: number) {
    const training = await this.trainingModel.findById(id);
    const trainingExist = !!training;
    if (!trainingExist)
      return new HttpException(
        'No training with this id',
        HttpStatus.BAD_REQUEST,
      );
    if (training.userid.toString() != userid)
      return new HttpException(
        'No privileges for this action',
        HttpStatus.FORBIDDEN,
      );

    return await this.trainingModel.findByIdAndDelete(id);
  }
}
