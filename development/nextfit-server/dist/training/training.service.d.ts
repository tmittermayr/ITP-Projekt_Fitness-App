import { HttpException } from '@nestjs/common';
import { ExerciseService } from 'src/exercise/exercise.service';
import mongoose, { Model } from 'mongoose';
import { Training, TrainingDokument } from 'src/schema/training.schema';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UserService } from 'src/user/user.service';
import { ExerciseDocument } from 'src/schema/exercise.schema';
import { TrainingExerciseDokument } from 'src/schema/training.exercise.shema';
import { TrainingExerciseSetDokument } from 'src/schema/training.exercise.set.shema';
export declare class TrainingService {
    private readonly trainingModel;
    private readonly trainingExerciseModel;
    private readonly trainingExerciseSetModel;
    private readonly exerciseModel;
    private userService;
    private exerciseService;
    constructor(trainingModel: Model<TrainingDokument>, trainingExerciseModel: Model<TrainingExerciseDokument>, trainingExerciseSetModel: Model<TrainingExerciseSetDokument>, exerciseModel: Model<ExerciseDocument>, userService: UserService, exerciseService: ExerciseService);
    _dateFormat(): string;
    validateExercise(exerciseid: any): Promise<boolean>;
    exerciseTrainingCheck(exerciseids: any, exerciseid: any): number;
    validateSet(set: any): boolean;
    start(trainingDto: Readonly<CreateTrainingDto>, userid: any): Promise<TrainingDokument | HttpException>;
    stop(id: string): Promise<void>;
    addExercise(exerciseid: string, userid: any): Promise<HttpException | (Training & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    })>;
    addSet(weight: number, reps: number, attribute: string, exerciseid: string, userid: any): Promise<HttpException | (Training & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    })>;
    isActive(userid: any, type: any): Promise<Training | boolean | HttpException>;
    findAll(userid: any): Promise<TrainingDokument[]>;
    findOne(id: number, userid: any): Promise<TrainingDokument | HttpException>;
    findOnePopulate(id: string): Promise<Training & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    remove(userid: string, id: number): Promise<HttpException | (Training & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    })>;
}
