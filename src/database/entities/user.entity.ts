import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['email'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({unique : true})
    email : string;

    @Column({nullable : true})
    password : string;

    @Column({name : 'first_name',nullable : true})
    firstName : string;

    @Column({name : 'last_name',nullable : true})
    lastName : string;

    @Column({name : 'refresh_token'})
    refreshToken : string;
}