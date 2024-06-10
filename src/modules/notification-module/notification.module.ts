import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationRepository } from './notification.repository';
import { NotificationService } from './notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from 'src/database/entities/notification.entity';
import { NotificationToken } from 'src/database/entities/notification-token.entity';
import { ScheduleNotification } from 'src/database/entities/schedule-notification.entity';
import { User } from 'src/database/entities/user.entity';
import { ScheduleModule, SchedulerRegistry } from '@nestjs/schedule';

@Module({
    imports: [TypeOrmModule.forFeature([Notification,NotificationToken,ScheduleNotification,User]),ScheduleModule.forRoot()],
    controllers: [NotificationController],
    providers: [NotificationRepository,NotificationService],
})
export class NotificationModule { }
