import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PasswordInterface } from "src/auth/password-service/password.impl";
import { User } from "src/database/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,

    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }

    

}