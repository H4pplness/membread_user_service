import { InjectRepository } from "@nestjs/typeorm";
import { NotificationToken } from "src/database/entities/notification-token.entity";
import { ScheduleNotification } from "src/database/entities/schedule-notification.entity";
import { User } from "src/database/entities/user.entity";
import { Repository } from "typeorm"
import { Notification } from "src/database/entities/notification.entity";
import { SendingNotificationDTO } from "src/dtos/sendingnotification.dto";


export class NotificationRepository extends Repository<Notification> {
    constructor(
        @InjectRepository(Notification) private readonly notificationRepository: Repository<Notification>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(ScheduleNotification) private readonly scheduleNotificationRepository: Repository<ScheduleNotification>,
        @InjectRepository(NotificationToken) private readonly notificationTokenRepository: Repository<NotificationToken>
    ) {
        super(notificationRepository.target, notificationRepository.manager, notificationRepository.queryRunner);
    }


    async createScheduledNotification(createSchedule: SendingNotificationDTO, userId: string) {
        const schedule = new ScheduleNotification();
        schedule.title = createSchedule.title;
        schedule.body = createSchedule.description;
        schedule.notificationToken = createSchedule.token;
        schedule.time = createSchedule.time;
        schedule.userId = userId;
        schedule.courseId = createSchedule.courseId;
        if (createSchedule.scheduledDate) {
            schedule.scheduledDate = new Date(createSchedule.scheduledDate);
        } else {
            schedule.eachSunday = createSchedule.eachSunday;
            schedule.eachMonday = createSchedule.eachMonday;
            schedule.eachTuesday = createSchedule.eachTuesday;
            schedule.eachWednesday = createSchedule.eachWednesday;
            schedule.eachThursday = createSchedule.eachThursday;
            schedule.eachFriday = createSchedule.eachFriday;
            schedule.eachSaturday = createSchedule.eachSaturday;
        }

        return await schedule.save();
    }

    async getSchedule(userId: string) {
        const schedules = await this.scheduleNotificationRepository.find({
            select: ['id', 'title', 'body', 'time', 'eachFriday', 'eachMonday', 'eachSaturday', 'eachSunday', 'eachThursday', 'eachTuesday', 'eachWednesday', 'scheduledDate', 'courseId'],
            where: { userId },
        });
    
        return schedules.map(schedule => {
            return {
                id: schedule.id,
                title: schedule.title,
                body: schedule.body,
                time: schedule.time,
                eachFriday: schedule.eachFriday,
                eachMonday: schedule.eachMonday,
                eachSaturday: schedule.eachSaturday,
                eachSunday: schedule.eachSunday,
                eachThursday: schedule.eachThursday,
                eachTuesday: schedule.eachTuesday,
                eachWednesday: schedule.eachWednesday,
                scheduledDate:schedule.scheduledDate != null ? this.formatDate(schedule.scheduledDate) : null,
                courseId: schedule.courseId
            };
        });
    }
    
    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

}