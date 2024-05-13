import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateAccountDTO } from "src/dtos/createaccount.dto";
import { UserRepository } from "src/modules/user-module/user.repository";

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService : JwtService
    ) { }

    async signIn(){}

    async validateUserAndPassword(email: string, password: string) {
        const user = await this.userRepository.findOne({
            where: {
                email: email,
            }
        });

        if(!user){
            throw new UnauthorizedException("Email not existed !");
        }

        if (this.userRepository.comparePassword(password, user.password)) {
            const { password: _, ...userInfo } = user;
            return userInfo;
        }
        
        throw new UnauthorizedException('Wrong password');
    }

    async createNewAccount(createAccount: CreateAccountDTO) {
        return await this.userRepository.createNewAccount(createAccount);
    }

    generateAccessToken(payload) {
        return this.jwtService.sign(payload, {
            secret: process.env.ACCESS_TOKEN_SECRET,
            expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}s`,
        });
    }
    
    generateRefreshToken(payload) {
        return this.jwtService.sign(payload, {
            secret: process.env.REFRESH_TOKEN_SECRET,
            expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME}s`,
        });
    }

}