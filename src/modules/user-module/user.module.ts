/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service'
import { AuthModule } from 'src/auth/auth.module';
import { AchievementServiceModule } from '../achievement-service-module/achievement-service.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        AuthModule,
        AchievementServiceModule
    ],
    controllers: [UserController],
    providers: [
        UserService, 
        UserRepository,
    ],
    exports: [UserService, UserRepository]
})
export class UserModule { }
