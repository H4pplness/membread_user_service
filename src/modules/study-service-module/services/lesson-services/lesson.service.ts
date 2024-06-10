import { Inject, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

export class LessonService implements OnModuleInit{
    constructor(@Inject('STUDY_SERVICE') private readonly kafkaClient : ClientKafka){}
    
    async onModuleInit() {
        this.kafkaClient.subscribeToResponseOf('get-lesson');
        await this.kafkaClient.connect()
    }

    async getLesson(lessonId : number,userId : number)
    {
        return await lastValueFrom(this.kafkaClient.send('get-lesson',{lessonId,userId}));
    }
}