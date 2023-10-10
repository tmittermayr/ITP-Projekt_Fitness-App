import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { StatsService } from './stats.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Post('/calc')
  calc(@Request() request: any) {
    const userid = request.user.id;
    return this.statsService.calc(userid);
  }

  @Get('/weekly')
  getWeekly(@Request() request: any) {
    const userid = request.user.id;
    return this.statsService.getWeekly(userid);
  }

  @Get('/monthly')
  getMontly(@Request() request: any) {
    const userid = request.user.id;
    return this.statsService.getMonthly(userid);
  }

  @Get('/yearly')
  getYearly(@Request() request: any) {
    const userid = request.user.id;
    return this.statsService.getYearly(userid);
  }

  @Get('/total')
  getTotal(@Request() request: any) {
    const userid = request.user.id;
    return this.statsService.getTotal(userid);
  }
}
