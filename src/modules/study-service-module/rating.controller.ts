import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { RatingService } from "./services/rating.service";
import { AuthGuard } from "@nestjs/passport";

@Controller('rating')
export class RatingController {
    constructor(private readonly ratingService : RatingService){}

    @Get('')
    getRatingCourse(@Query('course_id') courseId : number){
        return this.ratingService.getRatingCourse(courseId);
    }

    @Post('')
    @UseGuards(AuthGuard('jwt'))
    voteCourse(@Body() body : {courseId : number,rate : boolean},@Req() req){
        return this.ratingService.voteCourse(req.user.userId,body.courseId,body.rate);
    }
}