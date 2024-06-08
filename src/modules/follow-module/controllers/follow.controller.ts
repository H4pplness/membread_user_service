import { Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { FollowService } from "../services/follow.service";
import { AuthGuard } from "@nestjs/passport";

@Controller('follow')
export class FollowController {
    constructor(private readonly followService:FollowService){}

    @Get('followers')
    getFollowers(@Query('following') following:string){
        return this.followService.getFollowerByFollowingId(following);
    }

    @Get('followings')
    getFollowing(@Query('follower') follower : string){
        return this.followService.getFollowingByFollowerId(follower);
    }

    @Get('count/followings')
    getNumberOfFollowings(@Query('follower') follower : string){
        return this.followService.getNumberOfFollowings(follower);
    }

    @Get('count/followers')
    getNumberOfFollowers(@Query('following') following : string){
        return this.followService.getNumberOfFollowers(following);
    }

    @Post('')
    @UseGuards(AuthGuard('jwt'))
    follow(@Req() req,@Query('following') following : string){
        return this.followService.follow(req.user.userId,following);
    }

    @Get('isfollow/')
    @UseGuards(AuthGuard('jwt'))
    checkFollow(@Req() req,@Query('following') following : string){
        return this.followService.checkFollow(req.user.userId,following);
    }

    @Get('popular')
    getPopularUser(){
        return this.followService.getPopularUser();
    }
}