import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { SendingNotificationDTO } from "src/dtos/sendingnotification.dto";
import { Validate } from "class-validator";
import { AuthGuard } from "@nestjs/passport";

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService : NotificationService){}
    @Post('send-notification')
    async sendNotidication(@Body() body: { token: string }) {
        const { token } = body;
        return await this.notificationService.sendingNotificationOneUser(token);
    }

    @Post('schedule')
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard('jwt'))
    async createSchedule(@Body() body : SendingNotificationDTO,@Req() req){
        console.log('REQUEST : ',body);
        return await this.notificationService.createScheduledDate(body.token,body,req.user.userId);
    }

    @Get('recent')
    @UseGuards(AuthGuard('jwt'))
    async getRecentNotification(@Req() req){
        return await this.notificationService.getRecentNotification(req.user.userId);
    }

    @Get('schedule')
    @UseGuards(AuthGuard('jwt'))
    getSchedule(@Req() req){
        return this.notificationService.getSchedule(req.user.userId);
    }
}