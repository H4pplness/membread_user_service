import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { MappingGoogleAccount } from "src/dtos/mappinggoogleaccount.dto";
import { UserRepository } from "src/modules/user-module/user.repository";
import { Repository } from "typeorm";

@Injectable()
export class GoogleService {
    constructor(
        @InjectRepository(User) private readonly userRepository : Repository<User>
    ) {}
    async validateUser(email: string, firstName: string,lastName : string) {
        const user = await this.userRepository.findOne({ where: { email: email } });

        if (user) {
            return user;
        }
        const newUser = await this.mappingGoogleAccount({ email,  firstName , lastName});
        
        return newUser;
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

    async findUser(id: string) {
        const user = await this.userRepository.findOne({ where: { id } });
        return id;
    }

    handlerLogin() {
        return 'handlerLogin';
    }

    handlerRedirect() {
        return 'handlerRedirect';
    }
}