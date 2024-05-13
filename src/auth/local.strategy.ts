import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { Strategy } from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy)
{
    constructor(private readonly authService : AuthService)
    {super({
        usernameField : 'email'
    })}

    async validate(email : string, password : string)
    {
        console.log("EMAIL : ",email);
        console.log("PASSWORD : ",password);
        let user = await this.authService.validateUserAndPassword(email,password);
        if(!user){
            throw new UnauthorizedException();
        }
        console.log("LOCAL STRATEGY VALIDATE : ",user);
        
        return user;
    }
}