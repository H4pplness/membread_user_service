import { Body, Controller, Get, Post, Query, Req, UseGuards, UsePipes } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { HonorService } from "./services/honor.service";
import { HONOR } from "src/dtos/honor.const";
import { AchieveHonorDTO } from "src/dtos/achievehonor.dto";
import { ScoreService } from "./services/score.service";
import { LeaderBoardPipe } from "src/pipes/leader-board.pipe";

@Controller('achievement')
export class AchievementServiceController {
    constructor(
        private readonly honorServicce : HonorService,
        private readonly scoreService : ScoreService
    ){}

    @Get('honor')
    async getUserHonor(@Query('user_id') userId){
        return await this.honorServicce.getHonor(userId);
    }

    @Get('honor-detail')
    @UseGuards(AuthGuard('jwt'))
    async getMyHonor(@Req() req){
        return await this.honorServicce.getHonor(req.user.userId);
    }

    @Post('')
    @UseGuards(AuthGuard('jwt'))
    async achieveHonor(@Req() req , @Body() body : {honor : HONOR}){
        let achieveHonor = new AchieveHonorDTO;
        achieveHonor.honor = body.honor;
        achieveHonor.userId = req.user.userId;
        return await this.honorServicce.achieveHonor(achieveHonor);
    }

    @Get('daily-score')
    @UseGuards(AuthGuard('jwt'))
    async getDailyScore(@Req() req){
        const response = await this.scoreService.getDailyScore(req.user.userId);
        return response;
    }

    @Get('total-score')
    @UseGuards(AuthGuard('jwt'))
    async getTotalScore(@Req() req){
        const totalScore = await this.scoreService.getTotalScore(req.user.userId) ?? 0;
        return {totalScore : parseInt(totalScore)};
    }

    @Get('leader-board')
    async getLeaderBoard(@Query('course_id') courseId:number , @Query('period',LeaderBoardPipe) period : string){
        return this.scoreService.getLeaderBoard(courseId,period);
    }

    @Get('goal')
    @UseGuards(AuthGuard('jwt'))
    async getGoal(@Req() req){
        return await this.honorServicce.getGoal(req.user.userId);
    }

    @Post('goal')
    @UseGuards(AuthGuard('jwt'))
    async setGoal(@Req() req,@Body() body : {goal : number}){
        return await this.honorServicce.setGoal(req.user.userId , body.goal);
    }
}