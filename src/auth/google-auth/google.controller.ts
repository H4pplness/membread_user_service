import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { GoogleGuard } from "./google.guard";
import { GoogleService } from "./google.service";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
@Controller('auth')
export class GoogleController {
    constructor(
        private readonly googleService: GoogleService,
        private readonly jwtService: JwtService
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
        const user = req.user;
        if (!user || typeof user !== 'object') {
            throw new Error('Invalid user data');
        }
        console.log("AO VCL");
        const accessToken = this.jwtService.sign({...user},{secret : process.env.ACCESS_TOKEN_SECRET});
        console.log("ACCESS TOKEN : ", accessToken);
        return { accessToken };
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