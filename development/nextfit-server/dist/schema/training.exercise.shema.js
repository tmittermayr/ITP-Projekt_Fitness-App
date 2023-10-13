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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingExerciseSchema = exports.TrainingExercise = void 0;
const exercise_schema_1 = require("./exercise.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TrainingExercise = class TrainingExercise {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'Exercise',
        required: true,
    }),
    __metadata("design:type", exercise_schema_1.Exercise)
], TrainingExercise.prototype, "exerciseid", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], TrainingExercise.prototype, "number", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Array)
], TrainingExercise.prototype, "sets", void 0);
TrainingExercise = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], TrainingExercise);
exports.TrainingExercise = TrainingExercise;
exports.TrainingExerciseSchema = mongoose_1.SchemaFactory.createForClass(TrainingExercise);
//# sourceMappingURL=training.exercise.shema.js.map