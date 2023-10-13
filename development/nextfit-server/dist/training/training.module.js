"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingModule = void 0;
const common_1 = require("@nestjs/common");
const training_service_1 = require("./training.service");
const training_controller_1 = require("./training.controller");
const mongoose_1 = require("@nestjs/mongoose");
const training_schema_1 = require("../schema/training.schema");
const exercise_module_1 = require("../exercise/exercise.module");
const user_module_1 = require("../user/user.module");
const training_exercise_shema_1 = require("../schema/training.exercise.shema");
const exercise_schema_1 = require("../schema/exercise.schema");
const training_exercise_set_shema_1 = require("../schema/training.exercise.set.shema");
let TrainingModule = class TrainingModule {
};
TrainingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            exercise_module_1.ExerciseModule,
            user_module_1.UserModule,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: training_schema_1.Training.name,
                    schema: training_schema_1.TrainingSchema,
                },
                {
                    name: training_exercise_shema_1.TrainingExercise.name,
                    schema: training_exercise_shema_1.TrainingExerciseSchema,
                },
                {
                    name: training_exercise_set_shema_1.TrainingExerciseSet.name,
                    schema: training_exercise_set_shema_1.TrainingExerciseSetSchema,
                },
                {
                    name: exercise_schema_1.Exercise.name,
                    schema: exercise_schema_1.ExerciseSchema,
                },
            ]),
        ],
        controllers: [training_controller_1.TrainingController],
        providers: [training_service_1.TrainingService],
        exports: [training_service_1.TrainingService],
    })
], TrainingModule);
exports.TrainingModule = TrainingModule;
//# sourceMappingURL=training.module.js.map