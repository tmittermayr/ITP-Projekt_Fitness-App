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
exports.TrainingController = void 0;
const common_1 = require("@nestjs/common");
const training_service_1 = require("./training.service");
const create_training_dto_1 = require("./dto/create-training.dto");
const jwt_guard_1 = require("../auth/guard/jwt.guard");
const add_exercise_dto_1 = require("./dto/add-exercise.dto");
const add_set_dto_1 = require("./dto/add-set.dto");
let TrainingController = class TrainingController {
    constructor(trainingService) {
        this.trainingService = trainingService;
    }
    start(createTrainingDto, request) {
        const userid = request.user.id;
        console.log(`TrainingC: {Training von ${userid} gestartet}`);
        return this.trainingService.start(createTrainingDto, userid);
    }
    stop(request) {
        const userid = request.user.id;
        return this.trainingService.stop(userid);
    }
    findOne(request, id) {
        const userid = request.user.id;
        return this.trainingService.findOne(id, userid);
    }
    findOnePopulate(id) {
        return this.trainingService.findOnePopulate(id);
    }
    find(request) {
        const userid = request.user.id;
        return this.trainingService.findAll(userid);
    }
    add(request, addExerciseDto) {
        const userid = request.user.id;
        return this.trainingService.addExercise(addExerciseDto.exerciseid, userid);
    }
    addSet(request, addSetDto) {
        const userid = request.user.id;
        return this.trainingService.addSet(addSetDto.weight, addSetDto.reps, addSetDto.attribute, addSetDto.exerciseid, userid);
    }
    isActive(request, type) {
        const userid = request.user.id;
        return this.trainingService.isActive(userid, type);
    }
    remove(request, id) {
        const userid = request.user.id;
        return this.trainingService.remove(userid, id);
    }
};
__decorate([
    (0, common_1.Post)('/start'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_training_dto_1.CreateTrainingDto, Object]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "start", null);
__decorate([
    (0, common_1.Patch)('/stop'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TrainingController.prototype, "stop", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], TrainingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('populated/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrainingController.prototype, "findOnePopulate", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TrainingController.prototype, "find", null);
__decorate([
    (0, common_1.Patch)('/addExercise'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_exercise_dto_1.AddExerciseDto]),
    __metadata("design:returntype", void 0)
], TrainingController.prototype, "add", null);
__decorate([
    (0, common_1.Patch)('/addSet'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_set_dto_1.AddSetDto]),
    __metadata("design:returntype", void 0)
], TrainingController.prototype, "addSet", null);
__decorate([
    (0, common_1.Get)('/isActive/:type'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], TrainingController.prototype, "isActive", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], TrainingController.prototype, "remove", null);
TrainingController = __decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)('training'),
    __metadata("design:paramtypes", [training_service_1.TrainingService])
], TrainingController);
exports.TrainingController = TrainingController;
//# sourceMappingURL=training.controller.js.map