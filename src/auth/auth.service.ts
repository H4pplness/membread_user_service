import { ConflictException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/database/entities/user.entity";
import { CreateAccountDTO } from "src/dtos/createaccount.dto";
import { PasswordInterface } from "./password-service/password.impl";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService : JwtService,
        @Inject('PasswordInterface') private readonly passwordService: PasswordInterface
    ) { }

    async signIn(){
        
    }

    async validateUserAndPassword(email: string, password: string) {
        const user = await this.userRepository.findOne({
            where: {
                email: email,
            }
        });

        if(!user){
            throw new UnauthorizedException("Email not existed !");
        }

        if (this.comparePassword(password, user.password)) {
            const { password: _, ...userInfo } = user;
            return userInfo;
        }
        
        throw new UnauthorizedException('Wrong password');
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

    async createNewAccount(account: CreateAccountDTO) {
        const user = await this.userRepository.findOne({
            where: {
                email: account.email
            }
        });
        if (user) {
            throw new ConflictException('Email is already taken');
        }
        const newAccount = new User();
        newAccount.email = account.email;
        newAccount.password = await this.passwordService.hashPassword(account.password);
        newAccount.firstName = account.firstName;
        newAccount.lastName = account.lastName;

        await newAccount.save();

        const {password : _, ...accountInfo} = newAccount;

        return accountInfo;
    }



    async comparePassword(password : string,hashedPassword : string)
    {
        return await this.passwordService.comparePassword(password,hashedPassword);
    }

}