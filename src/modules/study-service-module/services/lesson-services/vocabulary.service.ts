import { Body, Inject, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { CreateLessonVocabularyDTO } from "src/dtos/create-lessons/createlessonvocabulary.dto";
import { UpdateProgressLessonVocabularyDTO } from "src/dtos/updare-progress-lesson/updateprogresslessonvocabulary.dto";

export class VocabularyService implements OnModuleInit{
    constructor(@Inject('STUDY_SERVICE') private readonly kafkaClient : ClientKafka){}
    
    async onModuleInit() {
        this.kafkaClient.subscribeToResponseOf('create-lesson-vocabulary');
        this.kafkaClient.subscribeToResponseOf('review-vocabulary-lesson');
        this.kafkaClient.subscribeToResponseOf('study-vocabulary-lesson');
        this.kafkaClient.subscribeToResponseOf('update-progress-vocabulary-lesson');
        await this.kafkaClient.connect();    
    }
    
    async createLessonVocabulary(createLessonVocabulary: CreateLessonVocabularyDTO)
    {
        return await lastValueFrom(this.kafkaClient.send('create-lesson-vocabulary',{createLessonVocabulary}));
    }

    
    
    async updateProgressVocabularyLesson(updateProgress : UpdateProgressLessonVocabularyDTO)
    {
        return await lastValueFrom(this.kafkaClient.send('update-progress-vocabulary-lesson',{updateProgress}))
    }
}