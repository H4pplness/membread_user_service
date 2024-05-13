/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { PasswordService } from 'src/modules/user-module/password-service/password.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    controllers: [UserController],
    providers: [
        UserService, 
        UserRepository,
        {
            provide: 'PasswordInterface',
            useClass: PasswordService
        }
    ],
    exports: [UserService, UserRepository]
})
export class UserModule { }
