import { Body, Controller, Get, Put, Query, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./user.service";
import { MessagePattern } from "@nestjs/microservices";
import { UpdateUserInfoDTO } from "src/dtos/user/updateuserinfo.dto";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService : UserService
    )
    {}

    @Get('/info')
    async getInfo(@Query('user_id') userId : string)
    {
        return await this.userService.getInfo(userId);
    }

    @Get('logined')
    @UseGuards(AuthGuard('jwt'))
    async getAllInfo(@Req() req)
    {
        return await this.userService.getLoginedUser(req.user.userId);
    }

    @Put('update')
    @UseGuards(AuthGuard('jwt'))
    async updateInfo(@Req() req,@Body() updateUserInfo : UpdateUserInfoDTO)
    {
        return await this.userService.updateUserInfo(req.user.userId,updateUserInfo);
    }

    @MessagePattern('get-user-info')
    async handleGetUserInfo(data: { userId: string }) {
        console.log("USERID : ",data.userId);
        const userInfo = await this.userService.getInfo(data.userId); 
        console.log("USER INFO : ",userInfo);
        return JSON.stringify(userInfo);
    }
}