import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { NotificationToken } from "./notification-token.entity";

@Entity()
export class Notification extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column()
    title : string;

    @Column()
    body : string;

    @CreateDateColumn({
        default : 'now()',
        nullable : true,
        name : 'created_at'
    })
    createdAt : Date;

    @Column({name : 'userId'})
    userId : string;

    @Column({name : 'course_id',nullable : true})
    courseId : number;
}