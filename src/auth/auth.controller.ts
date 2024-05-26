import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Request } from "express";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { GetUser } from "src/decorators/get-user.decorator";
import { CreateAccountDTO } from "src/dtos/createaccount.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('sign-in')
    @UseGuards(AuthGuard('local'))
    signIn(@Req() req) {
        const accessToken = this.authService.generateAccessToken({userId : req.user.id});
        const refreshToken = this.authService.generateRefreshToken({userId : req.user.id});
        return {
            accessToken,refreshToken
        }
    }

    @Get('test')
    @UseGuards(AuthGuard('jwt'))
    testApi(@Body() body :  {hello:string}) {
        return "Hello " + body.hello;
    }

    @Post('sign-up')
    @UsePipes(new ValidationPipe())
    async signUp(@Body() createAccount : CreateAccountDTO)
    {
        return await this.authService.createNewAccount(createAccount);
    }

    @Post('refresh')
    @UseGuards(AuthGuard('refresh-token'))
    async getRefreshToken(@Req() req)
    {
        console.log("REQ : ",req.user);
        const accessToken = await this.authService.generateAccessToken({
            userId : req.user.userId
        });
        return {accessToken};
    }

    @Post('token')
    @UseGuards(AuthGuard('refresh-token'))
    async getAccessToken(@Req() req)
    {
        
    }
}