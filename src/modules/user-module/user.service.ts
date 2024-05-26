import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class UserService{
    constructor(
        private readonly userRepository : UserRepository,
    ){}

    async getInfo(userId : string)
    {
        return await this.userRepository.findOne({
            select : {
                "firstName" : true,
                "lastName" : true,
                "avatar" : true
            },
            where : {
                id : userId
            }
        })
    }

    async getLoginedUser(userId : string){
        return await this.userRepository.findOne({
            select : {
                "firstName" : true,
                "lastName" : true,
                "avatar" : true,
                "email" : true,
                "id" : true
            },
            where : {
                id : userId
            }
        });
    }


    async getUserInfoFromKafka(userId : string)
    {

    }

    async editUserInfo()
    {

    }
}