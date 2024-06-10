import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { CreateLessonTestDTO } from "src/dtos/create-lessons/createlessontest.dto";

@Injectable()
export class TestService implements OnModuleInit{
    constructor(
        @Inject('STUDY_SERVICE') private readonly kafkaClient : ClientKafka
    ){}
    async onModuleInit()  {
        this.kafkaClient.subscribeToResponseOf('create-lesson-test');
        await this.kafkaClient.connect()
    }

    async createLessonTest(createLessonTest : CreateLessonTestDTO){
        return await lastValueFrom(this.kafkaClient.send('create-lesson-test',{createLessonTest}));
    }

}