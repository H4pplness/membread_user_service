import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { lastValueFrom } from "rxjs";
import { User } from "src/database/entities/user.entity";
import { In, Repository } from "typeorm";

@Injectable()
export class ScoreService implements OnModuleInit{
    constructor(
        @Inject('ACHIEVEMENT_SERVICE') private readonly kafkaClient : ClientKafka,
        @InjectRepository(User) private readonly userRepository : Repository<User>
    ){}
    
    async onModuleInit() {
        this.kafkaClient.subscribeToResponseOf('get-daily-score');
        this.kafkaClient.subscribeToResponseOf('get-leader-board');    
        this.kafkaClient.subscribeToResponseOf('get-total-score');
        await this.kafkaClient.connect();
    }
    async getDailyScore(userId: string) {
        const response =  await lastValueFrom(this.kafkaClient.send('get-daily-score',{userId}));
        console.log("RESPONSE : ",response);
        return response;
    }

    async getTotalScore(userId: string) {
        return await lastValueFrom(this.kafkaClient.send('get-total-score',{userId}));
    }

    async getLeaderBoard(courseId : number,period : string){
        const leaderBoard = await lastValueFrom(this.kafkaClient.send('get-leader-board',{courseId,period}));
        const listUserId = leaderBoard.map((user) => user.userId);
        
        const listUserInfo = await this.userRepository.find({
            select : ["avatar","firstName","lastName","userName","id"],
            where : {
                id : In(listUserId)
            }
        })

        const leaderBoardDetail = leaderBoard.map((user)=>{
            const userInfo = listUserInfo.find((u)=>u.id === user.userId);
            return {...user,userInfo};
        });

        return leaderBoardDetail.sort((a,b)=>b.score - a.score);
    }
}