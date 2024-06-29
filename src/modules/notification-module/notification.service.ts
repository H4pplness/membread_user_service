import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import * as admin from 'firebase-admin';
import * as serviceAccount from './fcm-config.json';
import { SendingNotificationDTO } from '../../dtos/sendingnotification.dto';
import { CronJob } from "cron";
import { SchedulerRegistry } from "@nestjs/schedule";
import { NotificationRepository } from "./notification.repository";
import { Notification } from "src/database/entities/notification.entity";
import { Between, Repository } from "typeorm";
import { User } from "src/database/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { NotificationToken } from "src/database/entities/notification-token.entity";
import { ScheduleNotification } from "src/database/entities/schedule-notification.entity";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});
@Injectable()
export class NotificationService {
    constructor(
        private schedulerRegistry: SchedulerRegistry,
        private notificationRepository : NotificationRepository,
        @InjectRepository(NotificationToken) private readonly notificationTokenRepository : Repository<NotificationToken>,
        @InjectRepository(ScheduleNotification) private scheduleRepository : Repository<ScheduleNotification>
    ) {
    }

    async sendingNotificationOneUser(token: string) {
        const payload = {
            token: token,
            notification: {
                title: "Hi there this is title",
                body: "Hi there this is message"
            },
            data: {
                name: "Joe",
                age: "21"
            }
        }
        return admin.messaging().send(payload).then((res) => {
            return {
                success: true
            }

        }).catch((error) => {
            return {
                success: false
            }
        })
    }

    convertToCronTime(scheduleNotification: SendingNotificationDTO) {
        const [hourRaw, minuteRaw] = scheduleNotification.time.split(':');
        const hour = parseInt(hourRaw, 10).toString();
        const minute = parseInt(minuteRaw, 10).toString();
        let time = minute + " " + hour;

        if (scheduleNotification.scheduledDate != null) {
            const scheduledDate = new Date(scheduleNotification.scheduledDate);
            const month = scheduledDate.toLocaleString('default', { month: 'numeric' });
            const day = scheduledDate.toLocaleString('default', { day: 'numeric' });

            time = time + " " + day + " " + month + " *";

        } else {
            if (!(scheduleNotification.eachSunday ||
                scheduleNotification.eachMonday ||
                scheduleNotification.eachTuesday ||
                scheduleNotification.eachWednesday ||
                scheduleNotification.eachThursday ||
                scheduleNotification.eachFriday ||
                scheduleNotification.eachSaturday)) {
                throw new BadRequestException();
            }

            time = time + " * * ";
            if (scheduleNotification.eachSunday) {
                time = time + '0,';
            }
            if (scheduleNotification.eachMonday) {
                time = time + '1,';
            }
            if (scheduleNotification.eachTuesday) {
                time = time + '2,';
            }
            if (scheduleNotification.eachWednesday) {
                time = time + '3,';
            }
            if (scheduleNotification.eachThursday) {
                time = time + '4,';
            }
            if (scheduleNotification.eachFriday) {
                time = time + '5,';
            }
            if (scheduleNotification.eachSaturday) {
                time = time + '6,';
            }
            time = time.slice(0, -1); // Xóa dấu phẩy cuối
        }
        console.log(time);
        return time;
    }

    async createScheduledDate(token: string, createSchedule: SendingNotificationDTO,userId : string) {
        const schedule = await this.notificationRepository.createScheduledNotification(createSchedule,userId);
        // const tokenNotification = await this.notificationTokenRepository.find({

        // })
        const payload = {
            token: token,
            notification: {
                title: createSchedule.title,
                body: createSchedule.description
            }
        }

        const cronJobTime = this.convertToCronTime(createSchedule);


        const job = new CronJob(cronJobTime, async () => {
            console.log("PAYLOAD : ",payload);
            const notification = new Notification();
            notification.title = createSchedule.title;
            notification.body = createSchedule.description;
            notification.userId = userId;
            notification.courseId = createSchedule.courseId;
            await notification.save();
            try{
                await admin.messaging().send(payload);
            }catch(error){
                console.log("Error : ",error);
            }
        });

        this.schedulerRegistry.addCronJob(schedule.id,job);
        job.start();
    }

    async getRecentNotification(userId : string){
        const today = new Date();
        const oneWeekAgo = new Date(today.getDate()-7);
        const user =await User.findOne({where : {id : userId}});
        const avatar = user.avatar;
        const notifications = await this.notificationRepository.find({
            where : {userId :userId,createdAt : Between(oneWeekAgo,today)},
            order : {createdAt:'DESC'}
        });

        return notifications.map((notification)=>{
            const {userId , ...notificationInfo} = notification;
            
            return {...notificationInfo,avatar : avatar};
        });
    }
    
    async getSchedule(userId: string) {
        return await this.notificationRepository.getSchedule(userId);
    }

    async deleteSchedule(userId : string,scheduleId : string){
        const schedule = await this.scheduleRepository.findOne({where : {id : scheduleId}});
        if(!schedule) throw new NotFoundException();
        else{
            if(schedule.userId != userId){
                throw new UnauthorizedException();
            }else{
                await this.scheduleRepository.delete(schedule.id);
                try{
                    const job: CronJob = this.schedulerRegistry.getCronJob(scheduleId);
                    job.stop();
                    this.schedulerRegistry.deleteCronJob(scheduleId);
                }catch(error){
                    console.log(error)
                }
        
                return {
                    "message" : "deleted"
                }
            }
        }
    }
}