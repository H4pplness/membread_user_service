import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationRepository } from './notification.repository';
import { NotificationService } from './notification.service';

@Module({
    imports: [],
    controllers: [NotificationController],
    providers: [NotificationRepository,NotificationService],
})
export class NotificationModule { }
