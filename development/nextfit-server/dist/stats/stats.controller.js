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
exports.StatsController = void 0;
const common_1 = require("@nestjs/common");
const stats_service_1 = require("./stats.service");
const jwt_guard_1 = require("../auth/guard/jwt.guard");
let StatsController = class StatsController {
    constructor(statsService) {
        this.statsService = statsService;
    }
    calc(request) {
        const userid = request.user.id;
        return this.statsService.calc(userid);
    }
    getWeekly(request) {
        const userid = request.user.id;
        return this.statsService.getWeekly(userid);
    }
    getMontly(request) {
        const userid = request.user.id;
        return this.statsService.getMonthly(userid);
    }
    getYearly(request) {
        const userid = request.user.id;
        return this.statsService.getYearly(userid);
    }
    getTotal(request) {
        const userid = request.user.id;
        return this.statsService.getTotal(userid);
    }
};
__decorate([
    (0, common_1.Post)('/calc'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StatsController.prototype, "calc", null);
__decorate([
    (0, common_1.Get)('/weekly'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StatsController.prototype, "getWeekly", null);
__decorate([
    (0, common_1.Get)('/monthly'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StatsController.prototype, "getMontly", null);
__decorate([
    (0, common_1.Get)('/yearly'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StatsController.prototype, "getYearly", null);
__decorate([
    (0, common_1.Get)('/total'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StatsController.prototype, "getTotal", null);
StatsController = __decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)('stats'),
    __metadata("design:paramtypes", [stats_service_1.StatsService])
], StatsController);
exports.StatsController = StatsController;
//# sourceMappingURL=stats.controller.js.map