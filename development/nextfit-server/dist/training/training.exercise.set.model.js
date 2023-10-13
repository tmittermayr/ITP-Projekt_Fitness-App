"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingExerciseSetModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const training_exercise_set_shema_1 = require("../schema/training.exercise.set.shema");
let TrainingExerciseSetModule = class TrainingExerciseSetModule {
};
TrainingExerciseSetModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: training_exercise_set_shema_1.TrainingExerciseSet.name,
                    schema: training_exercise_set_shema_1.TrainingExerciseSetSchema,
                },
            ]),
        ],
    })
], TrainingExerciseSetModule);
exports.TrainingExerciseSetModule = TrainingExerciseSetModule;
//# sourceMappingURL=training.exercise.set.model.js.map