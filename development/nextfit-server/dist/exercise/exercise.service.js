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
exports.ExerciseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const exercise_schema_1 = require("../schema/exercise.schema");
let ExerciseService = class ExerciseService {
    constructor(exerciseModel) {
        this.exerciseModel = exerciseModel;
    }
    async create(createExerciseDto) {
        const exercise = new this.exerciseModel(createExerciseDto);
        return exercise.save();
    }
    async findAll() {
        return this.exerciseModel.find().exec();
    }
    async findOne(id) {
        return await this.exerciseModel.findById(id);
    }
    async findNameById(id) {
        return await this.exerciseModel.find({ _id: id }, 'name');
    }
    async findByTarget(target) {
        return await this.exerciseModel.find({ target });
    }
    async findByBodypart(bodypart) {
        return await this.exerciseModel.find({ bodypart });
    }
    async findByEquipment(equipment) {
        return await this.exerciseModel.find({ equipment });
    }
};
ExerciseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(exercise_schema_1.Exercise.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ExerciseService);
exports.ExerciseService = ExerciseService;
//# sourceMappingURL=exercise.service.js.map