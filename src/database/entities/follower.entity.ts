import { BaseEntity, Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Follower extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({type : 'uuid',nullable : false})
    follower : string;

    @Column({type : 'uuid', nullable : false})
    following : string;

    @DeleteDateColumn({name : 'delete_at'})
    deleteAt : Date;
    
}