/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Stats, StatsDokument } from 'src/schema/stats.schema';
import { TrainingService } from 'src/training/training.service';
import { UserService } from 'src/user/user.service';
export declare class StatsService {
    private readonly statsModel;
    private userService;
    private trainingsService;
    constructor(statsModel: Model<StatsDokument>, userService: UserService, trainingsService: TrainingService);
    _calcPercentage(bodypart: any): {
        waist: number;
        legs: number;
        back: number;
        chest: number;
        arms: number;
        shoulders: number;
    };
    _calcStats(training: any): Promise<((string | number)[] | (string | {
        waist: number;
        legs: number;
        back: number;
        chest: number;
        arms: number;
        shoulders: number;
    })[])[]>;
    calc(userid: any): Promise<HttpException | (Stats & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })>;
    getTotal(userid: any): Promise<any[]>;
    getYearly(userid: any): Promise<void>;
    getMonthly(userid: any): Promise<void>;
    getWeekly(userid: any): Promise<void>;
}
