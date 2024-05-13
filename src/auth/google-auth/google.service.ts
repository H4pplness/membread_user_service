import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepository } from "src/modules/user-module/user.repository";

@Injectable()
export class GoogleService {
    constructor(
        private readonly userRepository : UserRepository
    ) {}
    async validateUser(email: string, firstName: string,lastName : string) {
        const user = await this.userRepository.findOne({ where: { email: email } });

        if (user) {
            return user;
        }
        const newUser = await this.userRepository.mappingGoogleAccount({ email,  firstName , lastName});
        
        return newUser;
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