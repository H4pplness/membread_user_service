import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RefreshToken extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({name : 'user_id'})
    userId : string;

    @Column({name : 'refresh_token'})
    refreshToken : string;

    @Column({name : 'expires_in'})
    expiresIn : Date;
    
}