import { BadRequestException, Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { AchieveHonorDTO } from "src/dtos/achievehonor.dto";

@Injectable()
export class HonorService implements OnModuleInit{
    constructor(@Inject('ACHIEVEMENT_SERVICE')private readonly kafkaClient : ClientKafka){}

    async onModuleInit() {
        this.kafkaClient.subscribeToResponseOf('get-user-honor');
        this.kafkaClient.subscribeToResponseOf('achieve-honor');
        this.kafkaClient.subscribeToResponseOf('set-goal');
        this.kafkaClient.subscribeToResponseOf('get-goal');
        await this.kafkaClient.connect();
    }

    async getHonor(userId: string) {
        return await lastValueFrom(this.kafkaClient.send('get-user-honor',{userId}));
    }

    async achieveHonor(honor: AchieveHonorDTO){
        try{
            const response = await lastValueFrom(this.kafkaClient.send('achieve-honor',{honor}))
            return response;
        }catch(error){
            throw new BadRequestException(error);
        }
    }

    async setGoal(userId:string,goal:number){
        const response = await lastValueFrom(this.kafkaClient.send('set-goal',{userId,goal}));
        return "SUCCESS";
    }

    async getGoal(userId : string){
        return await lastValueFrom(this.kafkaClient.send('get-goal',{userId}));
    }

}