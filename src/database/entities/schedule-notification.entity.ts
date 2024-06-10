import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { NotificationToken } from "./notification-token.entity";

@Entity({name : 'schedule_notification'})
export class ScheduleNotification extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title : string;

    @Column()
    body : string;

    @Column({name : 'user_id'})
    userId : string;

    @Column({name : 'notification_token'})
    notificationToken : string;

    @Column({name : 'each_sunday',default : false})
    eachSunday : boolean;

    @Column({name : 'each_monday',default : false})
    eachMonday : boolean;

    @Column({name : 'each_tuesday' , default : false})
    eachTuesday : boolean;

    @Column({name : 'each_wednesday' , default : false})
    eachWednesday : boolean;

    @Column({name : 'each_thursday' , default : false})
    eachThursday : boolean;

    @Column({name : 'each_friday',default : false})
    eachFriday : boolean;

    @Column({name : 'each_saturday',default : false})
    eachSaturday : boolean;

    @Column({name : 'scheduled_date',nullable : true})
    scheduledDate : Date;

    @Column({name : 'time'})
    time : string;

    @Column({name : 'course_id',nullable : true})
    courseId : number;
    
}