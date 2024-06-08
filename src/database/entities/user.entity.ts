import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['email'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({unique : true})
    email : string;

    @Column({name : 'user_name',nullable : true})
    userName : string;

    @Column({nullable : true})
    password : string;

    @Column({name : 'first_name',nullable : true})
    firstName : string;

    @Column({name : 'last_name',nullable : true})
    lastName : string;

    @Column({name : 'avatar' , nullable :true})
    avatar : string;

    @Column({name : 'number_of_followers',default : 0})
    numberOfFollowers : number;

    @Column({name : 'number_of_followings',default : 0})
    numberOfFollowings : number;
}