import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class RatingService implements OnModuleInit{
    constructor(
        @Inject('STUDY_SERVICE') private readonly kafkaClient : ClientKafka,
    ){}

    onModuleInit() {
        this.kafkaClient.subscribeToResponseOf('vote-course');
        this.kafkaClient.subscribeToResponseOf('get-rating-course');
    }

    async voteCourse(userId : string,courseId : number,rate : boolean){
        return await lastValueFrom(this.kafkaClient.send('vote-course',{userId,courseId,rate}));
    }

    async getRatingCourse(courseId : number){
        return await lastValueFrom(this.kafkaClient.send('get-rating-course',{courseId}));
    } 


}