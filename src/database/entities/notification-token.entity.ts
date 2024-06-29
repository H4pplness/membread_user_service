import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'notification_token' })
export class NotificationToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    @ManyToOne(() => User)
    user: User;

    @Column()
    notification_token : string;

    @Column()
    device_type : string;

    @DeleteDateColumn({name : 'delete_at',nullable : true})
    deleteAt : Date;
}