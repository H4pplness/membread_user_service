import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "src/database/entities/user.entity";
import { UserService } from "./user.service";
import { use } from "passport";
import { MessagePattern } from "@nestjs/microservices";

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

    @Get('all-info')
    @UseGuards(AuthGuard('jwt'))
    getAllInfo()
    {
        return "HEllo world";
    }

    @MessagePattern('get-user-info')
    async handleGetUserInfo(data: { userId: string }) {
        console.log("USERID : ",data.userId);
        const userInfo = await this.userService.getInfo(data.userId); 
        console.log("USER INFO : ",userInfo);
        return JSON.stringify(userInfo);
    }
}