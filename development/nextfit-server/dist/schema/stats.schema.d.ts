import mongoose, { Document } from 'mongoose';
import { User } from './user.shema';
import { Training } from './training.schema';
export declare class Stats {
    userid: User;
    minutes: any[];
    bodypart: any[];
    lastCalc: Training[];
}
export type StatsDokument = Stats & Document;
export declare const StatsSchema: mongoose.Schema<Stats, mongoose.Model<Stats, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Stats>;
