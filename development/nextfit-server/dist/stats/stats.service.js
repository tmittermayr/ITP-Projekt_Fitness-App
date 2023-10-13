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
exports.StatsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const stats_schema_1 = require("../schema/stats.schema");
const training_service_1 = require("../training/training.service");
const user_service_1 = require("../user/user.service");
let StatsService = class StatsService {
    constructor(statsModel, userService, trainingsService) {
        this.statsModel = statsModel;
        this.userService = userService;
        this.trainingsService = trainingsService;
    }
    _calcPercentage(bodypart) {
        const bodyparts = {
            waist: 0,
            legs: 0,
            back: 0,
            chest: 0,
            arms: 0,
            shoulders: 0,
        };
        const bodypartChecker = {
            waist: 0,
            legs: 0,
            back: 0,
            chest: 0,
            arms: 0,
            shoulders: 0,
        };
        let counter = 0;
        bodypart.forEach((parts) => {
            console.log(parts[0]);
            console.log(bodypartChecker);
            if (parts.length > 0 &&
                JSON.stringify(parts[0]) !== JSON.stringify(bodypartChecker)) {
                bodyparts.waist += parts[0].waist;
                bodyparts.legs += parts[0].legs;
                bodyparts.back += parts[0].back;
                bodyparts.chest += parts[0].chest;
                bodyparts.arms += parts[0].arms;
                bodyparts.shoulders += parts[0].shoulders;
                counter++;
            }
        });
        console.log(counter);
        return {
            waist: (bodyparts.waist / counter) * 100,
            legs: (bodyparts.legs / counter) * 100,
            back: (bodyparts.back / counter) * 100,
            chest: (bodyparts.chest / counter) * 100,
            arms: (bodyparts.arms / counter) * 100,
            shoulders: (bodyparts.shoulders / counter) * 100,
        };
    }
    async _calcStats(training) {
        const trainingPop = await this.trainingsService.findOnePopulate(training);
        const time = Math.floor(((trainingPop.enddatetime != undefined
            ? trainingPop.enddatetime.getTime()
            : Date.now()) -
            trainingPop.startdatetime.getTime()) /
            1000 /
            60);
        const bodyparts = {
            waist: 0,
            legs: 0,
            back: 0,
            chest: 0,
            arms: 0,
            shoulders: 0,
        };
        for (let i = 0; i < trainingPop.exerciseids.length; i++) {
            const exercise = trainingPop.exerciseids[i];
            console.log(exercise.exerciseid.target);
            switch (exercise.exerciseid.target) {
                case 'abs':
                    bodyparts.waist++;
                    break;
                case 'calves':
                case 'lower legs':
                case 'glutes':
                case 'hamstring':
                case 'quads':
                    bodyparts.legs++;
                    break;
                case 'delts':
                case 'lats':
                case 'spline':
                case 'upper back':
                    bodyparts.back++;
                    break;
                case 'pectorals':
                case 'serratus anterior':
                    bodyparts.chest++;
                    break;
                case 'biceps':
                case 'triceps':
                case 'forearms':
                    bodyparts.arms++;
                    break;
                case 'traps':
                    bodyparts.shoulders++;
                    break;
            }
        }
        const date = trainingPop.startdatetime.toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        });
        return [
            [time, date],
            [bodyparts, date],
        ];
    }
    async calc(userid) {
        const user = await this.userService.findById(userid);
        if (!user) {
            return new common_1.HttpException('No such user', common_1.HttpStatus.NOT_FOUND);
        }
        const stats = await this.statsModel.findOne({ userid: userid });
        let trainings = user.trainings;
        const trainingTime = [];
        const bodyPart = [];
        if (stats) {
            trainings = trainings.filter((n) => !stats.lastCalc.includes(n));
        }
        for (let i = 0; i < trainings.length; i++) {
            const training = trainings[i];
            const newStats = await this._calcStats(training);
            if (Number(newStats[0][0]) > 0) {
                trainingTime.push(newStats[0]);
            }
            bodyPart.push(newStats[1]);
        }
        if (!stats) {
            const newStats = new this.statsModel({
                userid: userid,
                minutes: trainingTime,
                bodypart: bodyPart,
                lastCalc: user.trainings,
            });
            return newStats.save();
        }
        else {
            stats.minutes.push(trainingTime);
            stats.bodypart.push(bodyPart);
            const filter = { userid: userid };
            const update = { minutes: stats.minutes, bodypart: stats.bodypart };
            return this.statsModel.findOneAndUpdate(filter, update);
        }
    }
    async getTotal(userid) {
        const stats = await this.statsModel.findOne({ userid: userid });
        const bodypartPercent = this._calcPercentage(stats.bodypart);
        console.log(bodypartPercent);
        return stats.minutes;
    }
    async getYearly(userid) {
        const stats = await this.statsModel.findOne({ userid: userid });
    }
    async getMonthly(userid) {
        const stats = await this.statsModel.findOne({ userid: userid });
    }
    async getWeekly(userid) {
        const stats = await this.statsModel.findOne({ userid: userid });
    }
};
StatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(stats_schema_1.Stats.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        training_service_1.TrainingService])
], StatsService);
exports.StatsService = StatsService;
//# sourceMappingURL=stats.service.js.map