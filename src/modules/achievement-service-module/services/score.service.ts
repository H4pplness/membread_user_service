import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class ScoreService implements OnModuleInit{
    constructor(@Inject('ACHIEVEMENT_SERVICE') private readonly kafkaClient : ClientKafka){}
    
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
}