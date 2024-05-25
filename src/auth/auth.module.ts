/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/modules/user-module/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { PasswordService } from './password-service/password.service';
import { GoogleStrategy } from './google-auth/google.strategy';
import { GoogleService } from './google-auth/google.service';
import { SessionSerializer } from './google-auth/session.serializer';
import { GoogleController } from './google-auth/google.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';


@Module({
    imports: [
        JwtModule.register({}),
        PassportModule.register({ session: true }),
        TypeOrmModule.forFeature([User])
    ],
    controllers: [AuthController,GoogleController],
    providers: [
        AuthService,
        JwtStrategy,
        LocalStrategy,
        JwtRefreshStrategy,
        {
            provide: 'PasswordInterface',
            useClass: PasswordService
        },
        GoogleStrategy, 
        GoogleService,
        SessionSerializer,
        JwtService
    ],
    exports : [
        AuthService,
        LocalStrategy,
        JwtStrategy
    ]
})
export class AuthModule { }
