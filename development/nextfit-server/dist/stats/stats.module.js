"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsModule = void 0;
const common_1 = require("@nestjs/common");
const stats_service_1 = require("./stats.service");
const stats_controller_1 = require("./stats.controller");
const mongoose_1 = require("@nestjs/mongoose");
const stats_schema_1 = require("../schema/stats.schema");
const user_module_1 = require("../user/user.module");
const training_module_1 = require("../training/training.module");
let StatsModule = class StatsModule {
};
StatsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            training_module_1.TrainingModule,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: stats_schema_1.Stats.name,
                    schema: stats_schema_1.StatsSchema,
                },
            ]),
        ],
        controllers: [stats_controller_1.StatsController],
        providers: [stats_service_1.StatsService],
    })
], StatsModule);
exports.StatsModule = StatsModule;
//# sourceMappingURL=stats.module.js.map