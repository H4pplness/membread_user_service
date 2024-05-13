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
        private readonly jwtService: JwtService,
    ) { }

    @Post('sign-in')
    @UseGuards(AuthGuard('local'))
    signIn(@Req() req: Request) {
        console.log("REQ : ",req.user);
        try {
            const user = req.user;
            if (!user || typeof user !== 'object') {
                throw new Error('Invalid user data');
            }
            const accessToken = this.jwtService.sign({...user},{secret:process.env.ACCESS_TOKEN_SECRET});
            return { accessToken };
        } catch (error) {
            throw new UnauthorizedException('Failed to sign in');
        }
    }

    @Get('test')
    @UseGuards(AuthGuard('jwt'))
    testApi(@GetUser() user) {
        return user;
    }

    @Post('sign-up')
    @UsePipes(new ValidationPipe())
    async signUp(@Body() createAccount : CreateAccountDTO)
    {
        return await this.authService.createNewAccount(createAccount);
    }


}