import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PasswordInterface } from "src/modules/user-module/password-service/password.impl";
import { User } from "src/database/entities/user.entity";
import { CreateAccountDTO } from "src/dtos/createaccount.dto";
import { MappingGoogleAccount } from "src/dtos/mappinggoogleaccount.dto";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @Inject('PasswordInterface') private readonly passwordService: PasswordInterface
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }

    async createNewAccount(account: CreateAccountDTO) {
        const user = await this.findOne({
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

    async mappingGoogleAccount(mappingGoogleAccount: MappingGoogleAccount) {
        try {
            const googleAccount = new User();
            console.log("Mapping google account : ",mappingGoogleAccount);
            googleAccount.firstName = mappingGoogleAccount.firstName;
            googleAccount.lastName = mappingGoogleAccount.lastName;
            googleAccount.email = mappingGoogleAccount.email;
            googleAccount.save()
            return googleAccount;
        } catch (error) {
            throw new ConflictException(error);
        }
    }

    async comparePassword(password : string,hashedPassword : string)
    {
        return await this.passwordService.comparePassword(password,hashedPassword);
    }

}