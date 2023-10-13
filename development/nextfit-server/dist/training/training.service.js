"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const exercise_service_1 = require("../exercise/exercise.service");
const mongoose_2 = require("mongoose");
const training_schema_1 = require("../schema/training.schema");
const user_service_1 = require("../user/user.service");
const exercise_schema_1 = require("../schema/exercise.schema");
const training_exercise_shema_1 = require("../schema/training.exercise.shema");
const training_exercise_set_shema_1 = require("../schema/training.exercise.set.shema");
let TrainingService = class TrainingService {
    constructor(trainingModel, trainingExerciseModel, trainingExerciseSetModel, exerciseModel, userService, exerciseService) {
        this.trainingModel = trainingModel;
        this.trainingExerciseModel = trainingExerciseModel;
        this.trainingExerciseSetModel = trainingExerciseSetModel;
        this.exerciseModel = exerciseModel;
        this.userService = userService;
        this.exerciseService = exerciseService;
    }
    _dateFormat() {
        const date_Object = new Date();
        const date_String = date_Object.getDate() +
            '/' +
            (date_Object.getMonth() + 1) +
            '/' +
            +date_Object.getFullYear();
        return date_String;
    }
    async validateExercise(exerciseid) {
        const exercise = await this.exerciseService.findOne(exerciseid);
        const exerciseExist = !!exercise;
        if (!exerciseExist)
            return false;
        return true;
    }
    exerciseTrainingCheck(exerciseids, exerciseid) {
        for (let i = 0; i < exerciseids.length; i++) {
            const exercise = exerciseids[i];
            if (exercise.exerciseid == exerciseid)
                return i;
        }
        return -1;
    }
    validateSet(set) {
        const attribute = set.attribute;
        if (attribute != 'Warm-Up' && attribute != 'Set' && attribute != '')
            return false;
        return true;
    }
    async start(trainingDto, userid) {
        const user = await this.userService.findById(userid);
        if (!user)
            return new common_1.HttpException("User token invalid user doesn't exist", common_1.HttpStatus.NOT_FOUND);
        const trainingExist = await this.isActive(userid, 'boolean');
        if (trainingExist) {
            return new common_1.HttpException('Training already started', common_1.HttpStatus.FORBIDDEN);
        }
        let title = trainingDto.title;
        if (!title)
            title = `Training vom ${this._dateFormat()}`;
        if (trainingDto.exerciseids !== undefined) {
            trainingDto.exerciseids.forEach((exercise) => {
                if (!this.validateExercise(exercise))
                    return new common_1.HttpException("Exercise schema isn't ok", common_1.HttpStatus.BAD_REQUEST);
            });
        }
        const training = new this.trainingModel({
            title: title,
            userid: userid,
            exerciseids: trainingDto.exerciseids == undefined ? [] : trainingDto.exerciseids,
            startdatetime: Date.now(),
            enddatetime: null,
        });
        const newTraining = await training.save();
        await this.userService.addTrainingId(newTraining._id, userid);
        return newTraining;
    }
    async stop(id) {
        const filter = { enddatetime: null, userid: id };
        const update = { enddatetime: Date.now() };
        await this.trainingModel.findOneAndUpdate(filter, update);
    }
    async addExercise(exerciseid, userid) {
        const trainingExist = this.isActive(userid, 'boolean');
        if (!trainingExist)
            return new common_1.HttpException('No current training', common_1.HttpStatus.NOT_FOUND);
        const exerciseExist = await this.validateExercise(exerciseid);
        if (!exerciseExist)
            return new common_1.HttpException('No such exercise', common_1.HttpStatus.BAD_REQUEST);
        const filter = { enddatetime: null, userid: userid };
        const training = await this.trainingModel.findOne(filter);
        training.exerciseids.push(new this.trainingExerciseModel({
            exerciseid: exerciseid,
            number: training.exerciseids.length + 1,
            sets: [],
        }));
        const update = { exerciseids: training.exerciseids };
        return await this.trainingModel.findByIdAndUpdate(training.id, update);
    }
    async addSet(weight, reps, attribute, exerciseid, userid) {
        const trainingExist = this.isActive(userid, 'boolean');
        if (!trainingExist)
            return new common_1.HttpException('No current training', common_1.HttpStatus.NOT_FOUND);
        const filter = { enddatetime: null, userid: userid };
        const training = await this.trainingModel.findOne(filter);
        if (training.exerciseids.length === 0)
            return new common_1.HttpException('No exercises in this Training', common_1.HttpStatus.BAD_REQUEST);
        const exerciseIndex = this.exerciseTrainingCheck(training.exerciseids, exerciseid);
        if (exerciseIndex == -1)
            return new common_1.HttpException('Training missing exercise', common_1.HttpStatus.BAD_REQUEST);
        const res = await this.trainingModel
            .find({ enddatetime: null, userid: userid }, 'exerciseids')
            .exec();
        const exerciseids = res[0].exerciseids;
        for (let i = 0; i < exerciseids.length; i++) {
            const element = exerciseids[i];
            const id = element.exerciseid.toString();
            if (id === exerciseid) {
                element.sets.push(new this.trainingExerciseSetModel({
                    index: element.sets.length,
                    weight: weight,
                    reps: reps,
                    attribute: attribute,
                }));
            }
        }
        const update = { exerciseids: exerciseids };
        return await this.trainingModel.findByIdAndUpdate(training.id, update);
    }
    async isActive(userid, type) {
        const filter = { enddatetime: null, userid: userid };
        const training = await this.trainingModel.findOne(filter);
        const trainingExist = !!training;
        if (trainingExist && type === 'object') {
            return training;
        }
        else if (!trainingExist && type === 'object') {
            return new common_1.HttpException('No current training', common_1.HttpStatus.NOT_FOUND);
        }
        else {
            return trainingExist;
        }
    }
    async findAll(userid) {
        return await this.trainingModel.find({ userid: userid });
    }
    async findOne(id, userid) {
        const training = await this.trainingModel.findById(id);
        const trainingExist = !!training;
        if (trainingExist) {
            if (training.userid == userid) {
                return training;
            }
            else {
                return new common_1.HttpException('No privilages for this action', common_1.HttpStatus.FORBIDDEN);
            }
        }
        else {
            return new common_1.HttpException('No such Training', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async findOnePopulate(id) {
        return await this.trainingModel.findOne({ _id: id }).populate({
            path: 'exerciseids',
            match: [this.exerciseModel],
            populate: { path: 'exerciseid', model: this.exerciseModel },
        });
    }
    async remove(userid, id) {
        const training = await this.trainingModel.findById(id);
        const trainingExist = !!training;
        if (!trainingExist)
            return new common_1.HttpException('No training with this id', common_1.HttpStatus.BAD_REQUEST);
        if (training.userid.toString() != userid)
            return new common_1.HttpException('No privileges for this action', common_1.HttpStatus.FORBIDDEN);
        return await this.trainingModel.findByIdAndDelete(id);
    }
};
TrainingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(training_schema_1.Training.name)),
    __param(1, (0, mongoose_1.InjectModel)(training_exercise_shema_1.TrainingExercise.name)),
    __param(2, (0, mongoose_1.InjectModel)(training_exercise_set_shema_1.TrainingExerciseSet.name)),
    __param(3, (0, mongoose_1.InjectModel)(exercise_schema_1.Exercise.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        user_service_1.UserService,
        exercise_service_1.ExerciseService])
], TrainingService);
exports.TrainingService = TrainingService;
//# sourceMappingURL=training.service.js.map