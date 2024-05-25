import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh-token')
{
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.REFRESH_TOKEN_SECRET,
            passReqToCallBack: true
        });
    }

    async validate(user) {
        return user;
    }
}