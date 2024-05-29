import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { ClientKafka } from "@nestjs/microservices";
import { HonorService } from "../achievement-service-module/services/honor.service";
import { ScoreService } from "../achievement-service-module/services/score.service";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository : UserRepository,
        private readonly honorService : HonorService,
        private readonly scoreService : ScoreService,
    ){}
    async getInfo(userId : string)
    {
        var userInfo = await this.userRepository.findOne({
            select : {
                "firstName" : true,
                "lastName" : true,
                "avatar" : true,
                "id" : true
            },
            where : {
                id : userId
            }
        });

        const totalScore = await this.scoreService.getTotalScore(userId);
        const honors = await this.honorService.getHonor(userId);

        const combineInfo  = {...userInfo, totalScore,honors};
        return combineInfo;
    }

    async getLoginedUser(userId : string){
        const userInfo = await this.userRepository.findOne({
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

        const totalScore = await this.scoreService.getTotalScore(userId);
        const honors = await this.honorService.getHonor(userId);

        const combineInfo  = {...userInfo, totalScore,honors};
        return combineInfo;
    }

}