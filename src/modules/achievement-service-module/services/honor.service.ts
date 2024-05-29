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

}