import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stats, StatsDokument } from 'src/schema/stats.schema';
import { TrainingService } from 'src/training/training.service';
import { UserService } from 'src/user/user.service';
import isEqual from 'lodash.isequal';
import { log } from 'console';
@Injectable()
export class StatsService {
  constructor(
    @InjectModel(Stats.name)
    private readonly statsModel: Model<StatsDokument>,
    private userService: UserService,
    private trainingsService: TrainingService,
  ) {}

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

    let counter = 1;

    bodypart.forEach((parts) => {
      console.log(parts[0]);
      console.log(bodypartChecker);

      if (
        parts.length > 0 &&
        JSON.stringify(parts[0]) !== JSON.stringify(bodypartChecker)
      ) {
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
      waist: Math.floor((bodyparts.waist / counter) * 100),
      legs: Math.floor((bodyparts.legs / counter) * 100),
      back: Math.floor((bodyparts.back / counter) * 100),
      chest: Math.floor((bodyparts.chest / counter) * 100),
      arms: Math.floor((bodyparts.arms / counter) * 100),
      shoulders: Math.floor((bodyparts.shoulders / counter) * 100),
    };
  }

  async _calcStats(training) {
    console.log(training);

    const trainingPop = await this.trainingsService.findOnePopulate(training);
    console.log(trainingPop);

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
    console.log(trainings);
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
      stats.minutes.push(trainingTime);
      stats.bodypart.push(bodyPart);
      const filter = { userid: userid };
      const update = { minutes: stats.minutes, bodypart: stats.bodypart };
      return this.statsModel.findOneAndUpdate(filter, update);
    }
  }

  async getTotal(userid: any) {
    const stats = await this.statsModel.findOne({ userid: userid });
    const bodypartPercent = this._calcPercentage(stats.bodypart);
    return { time: stats.minutes, percantage: bodypartPercent };
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
