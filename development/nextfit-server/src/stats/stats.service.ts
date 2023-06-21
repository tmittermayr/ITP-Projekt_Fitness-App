import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { log } from 'console';
import { Model } from 'mongoose';
import { Exercise, ExerciseDocument } from 'src/schema/exercise.schema';
import { Stats, StatsDokument } from 'src/schema/stats.schema';
import { Training, TrainingDokument } from 'src/schema/training.schema';
import { TrainingService } from 'src/training/training.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StatsService {
  constructor(
    @InjectModel(Stats.name)
    private readonly statsModel: Model<StatsDokument>,
    private userService: UserService,
    private trainingsService: TrainingService,
  ) {}

  _calcPercentage(bodypart: any[]) {
    const bodyparts = {
      waist: 0,
      legs: 0,
      back: 0,
      chest: 0,
      arms: 0,
      shoulders: 0,
    };
    let counter = 0;

    bodypart.forEach((parts) => {
      console.log(parts);
      console.log(bodyparts);

      bodyparts.waist = +parts.waist;
      bodyparts.legs = +parts.legs;
      bodyparts.back = +parts.back;
      bodyparts.chest = +parts.chest;
      bodyparts.arms = +parts.arms;
      bodyparts.shoulders = +parts.shoulders;
      counter++;
    });
    console.log(bodyparts);

    return {
      waist: bodyparts.waist * (100 / counter),
      legs: bodyparts.legs * (100 / counter),
      back: bodyparts.back * (100 / counter),
      chest: bodyparts.chest * (100 / counter),
      arms: bodyparts.arms * (100 / counter),
      shoulders: bodyparts.shoulders * (100 / counter),
    };
  }

  async _calcStats(training) {
    const trainingPop = await this.trainingsService.findOnePopulate(training);

    const time = Math.floor(
      ((trainingPop.enddatetime != undefined
        ? trainingPop.enddatetime.getTime()
        : Date.now()) -
        trainingPop.startdatetime.getTime()) /
        1000 /
        60,
    );

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
      return new HttpException('No such user', HttpStatus.NOT_FOUND);
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
    } else {
      const updateMinutes = stats.minutes.push(trainingTime);
      const updateBodypart = stats.bodypart.push(bodyPart);
      const filter = { userid: userid };
      const update = { minutes: updateMinutes, bodypart: updateBodypart };
      return this.statsModel.findOneAndUpdate(filter, update);
    }
  }

  async getTotal(userid: any) {
    const stats = await this.statsModel.findOne({ userid: userid });

    const bodypartPercent = this._calcPercentage(stats.bodypart);
    console.log(stats.minutes);

    return stats.minutes;
  }

  async getYearly(userid: any) {
    const stats = await this.statsModel.findOne({ userid: userid });
  }

  async getMonthly(userid: any) {
    const stats = await this.statsModel.findOne({ userid: userid });
  }

  async getWeekly(userid: any) {
    const stats = await this.statsModel.findOne({ userid: userid });
  }
}
