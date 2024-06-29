import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { GoogleGuard } from "./google.guard";
import { GoogleService } from "./google.service";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "../auth.service";
import { User } from "src/database/entities/user.entity";
@Controller('auth')
export class GoogleController {
    constructor(
        private readonly googleService: GoogleService,
        private readonly authService : AuthService
    ) { }

    @Get('google')
    @UseGuards(GoogleGuard)
    async googleAuth() {
        console.log("DA DUOC ACTIVATE");
        return this.googleService.handlerLogin();
    }

    @Get('google-redirect')
    @UseGuards(GoogleGuard)
    googleAuthRedirect(@Req() req: Request) {
        const user = req.user as User;
        if (!user || typeof user !== 'object') {
            throw new Error('Invalid user data');
        }
        console.log("AO VCL");
        const accessToken = this.authService.generateAccessToken({userId : user.id});
        const refreshToken = this.authService.generateRefreshToken({userId : user.id});
        return {
            accessToken,refreshToken
        }
    }

    @Get('status')
    user(@Req() req: Request) {
        if (req.user) {
            // console.log("REQUEST : ",req);
            return { message: 'Authenticated', user: req.user }
        } else {
            return { message: 'Not Authenticated' }
        }
    }
}