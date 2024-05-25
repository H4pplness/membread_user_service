import { Body, Inject, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { CreateLessonVocabularyDTO } from "src/dtos/create-lessons/createlessonvocabulary.dto";

export class VocabularyService implements OnModuleInit{
    constructor(@Inject('STUDY_SERVICE') private readonly kafkaClient : ClientKafka){}
    
    async onModuleInit() {
        this.kafkaClient.subscribeToResponseOf('create-lesson-vocabulary');
        this.kafkaClient.subscribeToResponseOf('get-lesson-vocabulary');
        this.kafkaClient.subscribeToResponseOf('review-vocabulary-lesson');
        this.kafkaClient.subscribeToResponseOf('study-vocabulary-lesson');
        this.kafkaClient.subscribeToResponseOf('update-progress-vocabulary-lesson');
        await this.kafkaClient.connect();    
    }
    
    async createLessonVocabulary(@Body() createLessonVocabulary: CreateLessonVocabularyDTO)
    {
        return await lastValueFrom(this.kafkaClient.send('create-lesson-vocabulary',{createLessonVocabulary}));
    }

    async getLessonVocabulary(lessonId : number,userId : number)
    {
        return await lastValueFrom(this.kafkaClient.send('get-lesson-vocabulary',{lessonId,userId}));
    }    
}