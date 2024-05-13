/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/modules/user-module/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { GoogleModule } from './google-auth/google.module';


@Module({
    imports: [
        UserModule, 
        PassportModule,
        JwtModule.register({}),
        GoogleModule
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
        LocalStrategy,
    ],
})
export class AuthModule { }
